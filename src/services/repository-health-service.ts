import { promises as fs } from "node:fs";
import path from "node:path";

import { Context, Effect, Layer } from "effect";

import { collectAnchors, listMarkdownFiles } from "../lib/docs-drift.js";
import {
  AppLogger,
  AppLoggerLive,
  AppLoggerNoop,
} from "../observability/app-logger.js";

const REQUIRED_AGENT_PROMPTS = [
  ".agents/docs-refresh.md",
  ".agents/experimenter.md",
  ".agents/manager.md",
  ".agents/onboarding.md",
  ".agents/pr-review.md",
  ".agents/repo-maintenance.md",
  ".agents/reviewer.md",
  ".agents/worker.md",
] as const;

const REQUIRED_REPO_INSTRUCTIONS = ["AGENTS.md", "CLAUDE.md"] as const;

const REQUIRED_GUIDES = [
  "docs/agent-failure-modes.md",
  "docs/agent-eval-workflow.md",
  "docs/agent-reasoning-workflow.md",
  "docs/background-agents.md",
  "docs/non-coder-workflow.md",
  "docs/repository-memory.md",
  "docs/template-setup.md",
] as const;

const REQUIRED_MEMORY_FILES = [
  ".memory/maintainer-preferences.md",
  ".memory/patterns.json",
  ".memory/repository-skills.md",
] as const;

const REQUIRED_PLAN_TEMPLATES = [
  "plans/README.md",
  "plans/_template/concepts.md",
  "plans/_template/files.md",
  "plans/_template/goal.md",
  "plans/_template/steps.md",
  "plans/_template/tasks.md",
  "plans/_template/validation.md",
] as const;

const REQUIRED_TEMPLATES = [
  ".github/ISSUE_TEMPLATE/ai-build-request.yml",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/pull_request_template.md",
] as const;

const REQUIRED_WORKFLOWS = [
  ".github/workflows/ci.yml",
  ".github/workflows/nightly-validation.yml",
] as const;

export interface RepositoryHealthReport {
  readonly agentPromptFiles: number;
  readonly anchoredDocuments: number;
  readonly guideDocuments: number;
  readonly instructionFiles: number;
  readonly issues: ReadonlyArray<string>;
  readonly memoryFiles: number;
  readonly markdownDocuments: number;
  readonly planTemplateFiles: number;
  readonly policyRuleFiles: number;
  readonly staleAnchors: number;
  readonly status: "healthy" | "needs-attention";
  readonly templateFiles: number;
  readonly workflowFiles: number;
}

export class RepositoryInspectionError extends Error {
  readonly _tag = "RepositoryInspectionError";

  constructor(
    readonly details: {
      readonly reason: string;
      readonly rootDir: string;
    },
  ) {
    super(details.reason);
    this.name = "RepositoryInspectionError";
  }

  get reason(): string {
    return this.details.reason;
  }

  get rootDir(): string {
    return this.details.rootDir;
  }
}

export interface RepositoryHealthServiceShape {
  readonly inspect: (
    rootDir: string,
  ) => Effect.Effect<RepositoryHealthReport, RepositoryInspectionError>;
}

export class RepositoryHealthService extends Context.Tag(
  "RepositoryHealthService",
)<RepositoryHealthService, RepositoryHealthServiceShape>() {}

async function countFilesWithExtension(
  directoryPath: string,
  extension: string,
): Promise<number> {
  try {
    const entries = await fs.readdir(directoryPath, {
      withFileTypes: true,
    });

    return entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(extension),
    ).length;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return 0;
    }

    throw error;
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

async function countPresentFiles(
  rootDir: string,
  requiredFiles: ReadonlyArray<string>,
): Promise<number> {
  let present = 0;

  for (const requiredFile of requiredFiles) {
    if (await fileExists(path.join(rootDir, requiredFile))) {
      present += 1;
    }
  }

  return present;
}

function toRepositoryInspectionError(
  rootDir: string,
  cause: unknown,
): RepositoryInspectionError {
  return new RepositoryInspectionError({
    reason: cause instanceof Error ? cause.message : String(cause),
    rootDir,
  });
}

export const RepositoryHealthServiceLive = Layer.effect(
  RepositoryHealthService,
  Effect.gen(function* () {
    const logger = yield* AppLogger;

    return {
      inspect: (rootDir: string) =>
        Effect.gen(function* () {
          const resolvedRootDir = path.resolve(rootDir);
          const markdownFiles = yield* Effect.tryPromise({
            catch: (cause) =>
              toRepositoryInspectionError(resolvedRootDir, cause),
            try: () => listMarkdownFiles(resolvedRootDir),
          });
          const anchors = yield* Effect.tryPromise({
            catch: (cause) =>
              toRepositoryInspectionError(resolvedRootDir, cause),
            try: () => collectAnchors(resolvedRootDir),
          });
          const policyRuleFiles = yield* Effect.tryPromise({
            catch: (cause) =>
              toRepositoryInspectionError(resolvedRootDir, cause),
            try: () =>
              countFilesWithExtension(
                path.join(resolvedRootDir, "rules"),
                ".yml",
              ),
          });
          const agentPromptFiles = yield* Effect.tryPromise({
            catch: (cause) =>
              toRepositoryInspectionError(resolvedRootDir, cause),
            try: () =>
              countFilesWithExtension(
                path.join(resolvedRootDir, ".agents"),
                ".md",
              ),
          });
          const instructionFiles = yield* Effect.tryPromise({
            catch: (cause) =>
              toRepositoryInspectionError(resolvedRootDir, cause),
            try: () =>
              countPresentFiles(resolvedRootDir, REQUIRED_REPO_INSTRUCTIONS),
          });
          const workflowFiles = yield* Effect.tryPromise({
            catch: (cause) =>
              toRepositoryInspectionError(resolvedRootDir, cause),
            try: () =>
              countFilesWithExtension(
                path.join(resolvedRootDir, ".github", "workflows"),
                ".yml",
              ),
          });
          const guideDocuments = yield* Effect.tryPromise({
            catch: (cause) =>
              toRepositoryInspectionError(resolvedRootDir, cause),
            try: () => countPresentFiles(resolvedRootDir, REQUIRED_GUIDES),
          });
          const memoryFiles = yield* Effect.tryPromise({
            catch: (cause) =>
              toRepositoryInspectionError(resolvedRootDir, cause),
            try: () =>
              countPresentFiles(resolvedRootDir, REQUIRED_MEMORY_FILES),
          });
          const planTemplateFiles = yield* Effect.tryPromise({
            catch: (cause) =>
              toRepositoryInspectionError(resolvedRootDir, cause),
            try: () =>
              countPresentFiles(resolvedRootDir, REQUIRED_PLAN_TEMPLATES),
          });
          const templateFiles = yield* Effect.tryPromise({
            catch: (cause) =>
              toRepositoryInspectionError(resolvedRootDir, cause),
            try: () => countPresentFiles(resolvedRootDir, REQUIRED_TEMPLATES),
          });
          const anchoredDocuments = new Set(
            anchors.map((anchor) => anchor.markdownPath),
          ).size;
          const staleAnchors = anchors.filter(
            (anchor) =>
              anchor.actualHash === null ||
              anchor.actualHash !== anchor.storedHash,
          ).length;

          const requiredFiles = [
            ...REQUIRED_REPO_INSTRUCTIONS,
            ...REQUIRED_AGENT_PROMPTS,
            ...REQUIRED_GUIDES,
            ...REQUIRED_MEMORY_FILES,
            ...REQUIRED_PLAN_TEMPLATES,
            ...REQUIRED_TEMPLATES,
            ...REQUIRED_WORKFLOWS,
          ];
          const missingFiles: string[] = [];

          for (const requiredFile of requiredFiles) {
            const exists = yield* Effect.tryPromise({
              catch: (cause) =>
                toRepositoryInspectionError(resolvedRootDir, cause),
              try: () => fileExists(path.join(resolvedRootDir, requiredFile)),
            });

            if (!exists) {
              missingFiles.push(requiredFile);
            }
          }

          const issues: string[] = [];

          if (policyRuleFiles === 0) {
            issues.push("No structural policy rules were found in rules/.");
          }

          if (agentPromptFiles < REQUIRED_AGENT_PROMPTS.length) {
            issues.push("The agent prompt scaffold is incomplete in .agents/.");
          }

          if (instructionFiles < REQUIRED_REPO_INSTRUCTIONS.length) {
            issues.push(
              "The repository instructions are incomplete. Keep both CLAUDE.md and AGENTS.md.",
            );
          }

          if (guideDocuments < REQUIRED_GUIDES.length) {
            issues.push("The operating guides are incomplete in docs/.");
          }

          if (memoryFiles < REQUIRED_MEMORY_FILES.length) {
            issues.push(
              "The repository memory scaffold is incomplete in .memory/.",
            );
          }

          if (planTemplateFiles < REQUIRED_PLAN_TEMPLATES.length) {
            issues.push(
              "The task-planning templates are incomplete in plans/.",
            );
          }

          if (templateFiles < REQUIRED_TEMPLATES.length) {
            issues.push(
              "The issue or pull request templates are incomplete in .github/.",
            );
          }

          if (workflowFiles === 0) {
            issues.push(
              "No GitHub workflow files were found in .github/workflows/.",
            );
          }

          if (anchoredDocuments === 0) {
            issues.push("No markdown documents contain drift anchors.");
          }

          if (staleAnchors > 0) {
            issues.push(
              `${staleAnchors} drift anchor${staleAnchors === 1 ? " is" : "s are"} stale.`,
            );
          }

          for (const missingFile of missingFiles) {
            issues.push(`Missing required repository file: ${missingFile}`);
          }

          const report: RepositoryHealthReport = {
            agentPromptFiles,
            anchoredDocuments,
            guideDocuments,
            instructionFiles,
            issues,
            memoryFiles,
            markdownDocuments: markdownFiles.length,
            planTemplateFiles,
            policyRuleFiles,
            staleAnchors,
            status: issues.length === 0 ? "healthy" : "needs-attention",
            templateFiles,
            workflowFiles,
          };

          yield* logger.info("repository.health.generated", {
            issues: report.issues.length,
            rootDir: resolvedRootDir,
            status: report.status,
            staleAnchors: report.staleAnchors,
          });

          return report;
        }),
    } satisfies RepositoryHealthServiceShape;
  }),
);

export const RepositoryHealthRuntimeLive = RepositoryHealthServiceLive.pipe(
  Layer.provide(AppLoggerLive),
);

export const RepositoryHealthRuntimeTest = RepositoryHealthServiceLive.pipe(
  Layer.provide(AppLoggerNoop),
);

export const RepositoryHealthRuntimeQuiet = RepositoryHealthServiceLive.pipe(
  Layer.provide(AppLoggerNoop),
);

export const inspectRepositoryHealth = (rootDir: string) =>
  Effect.flatMap(RepositoryHealthService, (service) =>
    service.inspect(rootDir),
  );
