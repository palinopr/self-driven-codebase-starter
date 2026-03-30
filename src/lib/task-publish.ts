import { execFile } from "node:child_process";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { analyzeTaskPlan } from "./task-plan.js";

const execFileAsync = promisify(execFile);

export interface CommandSpec {
  readonly args: ReadonlyArray<string>;
  readonly command: string;
}

export interface TaskPublishDraft {
  readonly branchName: string;
  readonly commitMessage: string;
  readonly prBody: string;
  readonly prTitle: string;
  readonly taskDirectory: string;
  readonly taskId: string;
}

export interface TaskPublishOptions {
  readonly dryRun?: boolean;
  readonly runCommand?: CommandRunner;
  readonly skipValidate?: boolean;
}

export interface TaskPublishResult extends TaskPublishDraft {
  readonly plannedCommands: ReadonlyArray<CommandSpec>;
  readonly prUrl: string | null;
}

export type CommandRunner = (
  command: string,
  args: ReadonlyArray<string>,
  cwd: string,
) => Promise<string>;

export class MissingTaskPlanError extends Error {
  readonly _tag = "MissingTaskPlanError";

  constructor(
    readonly taskDirectory: string,
    readonly missingFiles: ReadonlyArray<string>,
  ) {
    super(
      `Task plan is incomplete in ${taskDirectory}. Missing: ${missingFiles.join(", ")}`,
    );
    this.name = "MissingTaskPlanError";
  }
}

export class NoChangesToPublishError extends Error {
  readonly _tag = "NoChangesToPublishError";

  constructor() {
    super("There are no local changes to publish.");
    this.name = "NoChangesToPublishError";
  }
}

export class UnfilledTaskPlanError extends Error {
  readonly _tag = "UnfilledTaskPlanError";

  constructor(
    readonly taskDirectory: string,
    readonly unfilledFiles: ReadonlyArray<string>,
    readonly placeholderMarkers: ReadonlyArray<string>,
  ) {
    super(
      `Task plan in ${taskDirectory} still contains template placeholders in: ${unfilledFiles.join(", ")}`,
    );
    this.name = "UnfilledTaskPlanError";
  }
}

export class ScopeDriftError extends Error {
  readonly _tag = "ScopeDriftError";

  constructor(
    readonly taskDirectory: string,
    readonly allowedPaths: ReadonlyArray<string>,
    readonly unexpectedFiles: ReadonlyArray<string>,
  ) {
    super(
      `Task publish scope drift in ${taskDirectory}. Unexpected files: ${unexpectedFiles.join(", ")}`,
    );
    this.name = "ScopeDriftError";
  }
}

export async function buildTaskPublishDraft(
  rootDir: string,
  taskId: string,
): Promise<TaskPublishDraft> {
  const planAnalysis = await analyzeTaskPlan(rootDir, taskId);
  const { missingFiles, taskDirectory } = planAnalysis;

  if (missingFiles.length > 0) {
    throw new MissingTaskPlanError(taskDirectory, missingFiles);
  }

  if (planAnalysis.unfilledFiles.length > 0) {
    throw new UnfilledTaskPlanError(
      taskDirectory,
      planAnalysis.unfilledFiles,
      planAnalysis.placeholderMarkers,
    );
  }

  const normalizedTaskId = planAnalysis.taskId;

  const goal = await fs.readFile(path.join(taskDirectory, "goal.md"), "utf8");
  const concepts = await fs.readFile(
    path.join(taskDirectory, "concepts.md"),
    "utf8",
  );
  const validation = await fs.readFile(
    path.join(taskDirectory, "validation.md"),
    "utf8",
  );
  const tasks = await fs.readFile(path.join(taskDirectory, "tasks.md"), "utf8");

  const outcome = getSectionContent(goal, "## User Outcome");
  const problem = getSectionContent(goal, "## Current Problem");
  const conceptSummary = summarizeBullets(concepts, "## Domain Concepts");
  const evalSummary = summarizeBullets(concepts, "## Evaluation Concepts");
  const assumptionSummary = summarizeBullets(
    tasks,
    "## Open Questions And Assumptions",
  );
  const rollback = getSectionContent(validation, "## Rollback Notes");

  const shortSummary = toSingleLine(outcome) || normalizedTaskId;

  return {
    branchName: `codex/${normalizedTaskId}`,
    commitMessage: `[codex] Publish ${truncate(shortSummary, 60)}`,
    prBody: [
      "## Outcome",
      "",
      outcome || `See \`plans/${normalizedTaskId}/goal.md\`.`,
      "",
      "## AI Usage And Provenance",
      "",
      "- tools used: update before merge",
      "- tasks assisted by AI: update before merge",
      "- what was manually checked by a human: update before merge",
      "- remaining human review focus: update before merge",
      "",
      "## Reasoning Artifacts",
      "",
      `- plan path: \`plans/${normalizedTaskId}/\``,
      `- domain or evaluation concepts: ${conceptSummary || evalSummary || `See \`plans/${normalizedTaskId}/concepts.md\`.`}`,
      `- issue understanding: ${toSingleLine(problem) || `See \`plans/${normalizedTaskId}/goal.md\`.`}`,
      `- expected file scope: See \`plans/${normalizedTaskId}/files.md\``,
      `- implementation tasks: See \`plans/${normalizedTaskId}/tasks.md\``,
      `- step decomposition: See \`plans/${normalizedTaskId}/steps.md\``,
      "- changes outside expected scope: none recorded yet",
      "",
      "## Evidence",
      "",
      "- `npm run validate`: passed locally before publish",
      "- demo output: update before merge if relevant",
      "- screenshots or logs if relevant: attach if needed",
      `- held-out evaluation, if this was experiment or red-team work: ${evalSummary || `See \`plans/${normalizedTaskId}/validation.md\`.`}`,
      "",
      "## Risk Check",
      "",
      `- what could still be wrong: See \`plans/${normalizedTaskId}/validation.md\``,
      `- what did the agent assume: ${assumptionSummary || `See \`plans/${normalizedTaskId}/tasks.md\`.`}`,
      `- signs of reward hacking, if relevant: ${evalSummary || `See \`plans/${normalizedTaskId}/concepts.md\`.`}`,
      `- what needs manual verification: See \`plans/${normalizedTaskId}/validation.md\``,
      "",
      "## Rollback",
      "",
      rollback || `See \`plans/${normalizedTaskId}/validation.md\`.`,
    ].join("\n"),
    prTitle: `[task] ${truncate(shortSummary, 72)}`,
    taskDirectory,
    taskId: normalizedTaskId,
  };
}

export async function publishTask(
  rootDir: string,
  taskId: string,
  options: TaskPublishOptions = {},
): Promise<TaskPublishResult> {
  const draft = await buildTaskPublishDraft(rootDir, taskId);
  const runCommand = options.runCommand ?? defaultRunCommand;
  const allowedPaths = await readAllowedScopePaths(
    draft.taskDirectory,
    draft.taskId,
  );

  if (!options.skipValidate) {
    await runCommand("npm", ["run", "validate"], rootDir);
  }

  const gitStatus = await runCommand("git", ["status", "--porcelain"], rootDir);
  const changedFiles = listChangedFiles(gitStatus);

  if (changedFiles.length === 0) {
    throw new NoChangesToPublishError();
  }

  const unexpectedFiles = changedFiles.filter(
    (filePath) => !matchesAllowedScope(filePath, allowedPaths),
  );

  if (unexpectedFiles.length > 0) {
    throw new ScopeDriftError(
      draft.taskDirectory,
      allowedPaths,
      unexpectedFiles,
    );
  }

  const currentBranch = (
    await runCommand("git", ["rev-parse", "--abbrev-ref", "HEAD"], rootDir)
  ).trim();

  const plannedCommands: CommandSpec[] = [];

  if (currentBranch !== draft.branchName) {
    plannedCommands.push({
      args: ["switch", "-c", draft.branchName],
      command: "git",
    });
  }

  plannedCommands.push(
    {
      args: ["add", ...changedFiles],
      command: "git",
    },
    {
      args: ["commit", "-m", draft.commitMessage],
      command: "git",
    },
    {
      args: ["push", "-u", "origin", draft.branchName],
      command: "git",
    },
  );

  let prUrl: string | null = null;

  if (options.dryRun === true) {
    plannedCommands.push({
      args: [
        "pr",
        "create",
        "--draft",
        "--title",
        draft.prTitle,
        "--body-file",
        "<tempfile>",
      ],
      command: "gh",
    });

    return {
      ...draft,
      plannedCommands,
      prUrl,
    };
  }

  for (const commandSpec of plannedCommands) {
    await runCommand(commandSpec.command, commandSpec.args, rootDir);
  }

  const prBodyFile = path.join(
    await fs.mkdtemp(path.join(os.tmpdir(), "task-publish-")),
    "pr-body.md",
  );

  try {
    await fs.writeFile(prBodyFile, draft.prBody);

    const prArgs = [
      "pr",
      "create",
      "--draft",
      "--title",
      draft.prTitle,
      "--body-file",
      prBodyFile,
    ] as const;

    plannedCommands.push({
      args: [...prArgs],
      command: "gh",
    });

    prUrl = (await runCommand("gh", prArgs, rootDir)).trim() || null;
  } finally {
    await fs.rm(path.dirname(prBodyFile), { force: true, recursive: true });
  }

  return {
    ...draft,
    plannedCommands,
    prUrl,
  };
}

async function defaultRunCommand(
  command: string,
  args: ReadonlyArray<string>,
  cwd: string,
): Promise<string> {
  const result = await execFileAsync(command, [...args], { cwd });

  return result.stdout;
}

async function readAllowedScopePaths(
  taskDirectory: string,
  taskId: string,
): Promise<string[]> {
  const filesMarkdown = await fs.readFile(
    path.join(taskDirectory, "files.md"),
    "utf8",
  );
  const confirmedPaths = extractScopePaths(
    getSectionContent(filesMarkdown, "## Confirmed Files"),
  );
  const candidatePaths = extractScopePaths(
    getSectionContent(filesMarkdown, "## Candidate Files"),
  );

  return dedupePaths([
    ...confirmedPaths,
    ...candidatePaths,
    normalizeScopePath(`plans/${taskId}/`),
  ]);
}

function extractScopePaths(section: string): string[] {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .map(extractScopePathFromBullet)
    .filter((line): line is string => line !== null)
    .map(normalizeScopePath);
}

function extractScopePathFromBullet(bullet: string): string | null {
  const backtickedPath = bullet.match(/`([^`]+)`/);

  if (backtickedPath?.[1]) {
    return backtickedPath[1];
  }

  const rawPath = bullet.trim();

  if (rawPath.length === 0 || rawPath.includes(" ")) {
    return null;
  }

  return rawPath;
}

function dedupePaths(paths: ReadonlyArray<string>): string[] {
  return [...new Set(paths.filter((value) => value.length > 0))];
}

function normalizeScopePath(filePath: string): string {
  return filePath.replaceAll("\\", "/").trim();
}

function listChangedFiles(gitStatus: string): string[] {
  return gitStatus
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0)
    .map((line) => {
      const rawPath = line.startsWith("?? ") ? line.slice(3) : line.slice(3);

      if (rawPath.includes(" -> ")) {
        return rawPath.split(" -> ").at(-1) ?? rawPath;
      }

      return rawPath;
    })
    .map(normalizeScopePath);
}

function matchesAllowedScope(
  filePath: string,
  allowedPaths: ReadonlyArray<string>,
): boolean {
  return allowedPaths.some((allowedPath) => {
    if (allowedPath.endsWith("/")) {
      return filePath.startsWith(allowedPath);
    }

    return filePath === allowedPath || filePath.startsWith(`${allowedPath}/`);
  });
}

function getSectionContent(markdown: string, heading: string): string {
  const lines = markdown.split("\n");
  const startIndex = lines.findIndex((line) => line.trim() === heading);

  if (startIndex < 0) {
    return "";
  }

  const contentLines: string[] = [];

  for (const line of lines.slice(startIndex + 1)) {
    if (line.startsWith("## ")) {
      break;
    }

    contentLines.push(line);
  }

  return contentLines.join("\n").trim();
}

function summarizeBullets(markdown: string, heading: string): string {
  const section = getSectionContent(markdown, heading);

  if (section.length === 0) {
    return "";
  }

  const bullets = section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter((line) => line.length > 0);

  return bullets.slice(0, 3).join("; ");
}

function toSingleLine(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s*[:;,.!?]\s*$/, "")
    .trim();
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}
