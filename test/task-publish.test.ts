import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  type CommandRunner,
  buildTaskPublishDraft,
  publishTask,
} from "../src/lib/task-publish.js";

async function createFixtureRoot(): Promise<string> {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "task-publish-"));
  const templateSource = path.join(process.cwd(), "plans", "_template");

  await cp(templateSource, path.join(rootDir, "plans", "_template"), {
    recursive: true,
  });

  await mkdir(path.join(rootDir, "plans", "2026-03-30-demo-task"), {
    recursive: true,
  });

  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-demo-task", "goal.md"),
    [
      "# Goal",
      "",
      "## User Outcome",
      "",
      "A repo user can publish a task into a draft PR with one command.",
      "",
      "## Current Problem",
      "",
      "Publishing is still manual after implementation is done.",
      "",
      "## Constraints",
      "",
      "- keep it repo-local",
      "",
      "## Non-Goals",
      "",
      "- no auto-merge",
      "",
      "## Acceptance Evidence",
      "",
      "The command creates a branch, commit, push, and draft PR.",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-demo-task", "concepts.md"),
    [
      "# Concepts",
      "",
      "## Domain Concepts",
      "",
      "- safe publish boundary",
      "",
      "## Evaluation Concepts",
      "",
      "- held-out evaluation",
      "- reward-hacking risk",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-demo-task", "files.md"),
    "# Files\n",
  );
  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-demo-task", "tasks.md"),
    [
      "# Tasks",
      "",
      "## Open Questions And Assumptions",
      "",
      "- assume gh is installed",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-demo-task", "steps.md"),
    "# Steps\n",
  );
  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-demo-task", "validation.md"),
    [
      "# Validation",
      "",
      "## Rollback Notes",
      "",
      "Delete the branch and close the draft PR.",
      "",
    ].join("\n"),
  );

  return rootDir;
}

describe("buildTaskPublishDraft", () => {
  it("builds branch, commit, and pr metadata from the task plan", async () => {
    const rootDir = await createFixtureRoot();

    try {
      const draft = await buildTaskPublishDraft(
        rootDir,
        "2026-03-30-demo-task",
      );

      expect(draft.branchName).toBe("codex/2026-03-30-demo-task");
      expect(draft.commitMessage).toContain("[codex] Publish");
      expect(draft.prTitle).toContain("A repo user can publish a task");
      expect(draft.prBody).toContain("plans/2026-03-30-demo-task/");
      expect(draft.prBody).toContain("safe publish boundary");
      expect(draft.prBody).toContain(
        "Delete the branch and close the draft PR.",
      );
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });

  it("fails when the task plan is incomplete", async () => {
    const rootDir = await createFixtureRoot();

    try {
      await rm(path.join(rootDir, "plans", "2026-03-30-demo-task", "steps.md"));

      await expect(
        buildTaskPublishDraft(rootDir, "2026-03-30-demo-task"),
      ).rejects.toMatchObject({
        _tag: "MissingTaskPlanError",
        missingFiles: ["steps.md"],
      });
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });

  it("fails when the task plan still contains template placeholders", async () => {
    const rootDir = await createFixtureRoot();

    try {
      await writeFile(
        path.join(rootDir, "plans", "2026-03-30-demo-task", "steps.md"),
        [
          "# Step Decomposition",
          "",
          "1. First implementation step",
          "2. Second implementation step",
          "3. Validation checkpoint",
          "",
          "## Scope Change Rule",
          "",
          "If a new file or task becomes necessary, record the reason here before widening the diff.",
          "",
        ].join("\n"),
      );

      await expect(
        buildTaskPublishDraft(rootDir, "2026-03-30-demo-task"),
      ).rejects.toMatchObject({
        _tag: "UnfilledTaskPlanError",
        unfilledFiles: ["steps.md"],
      });
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });
});

describe("publishTask", () => {
  it("returns the planned git and gh commands in dry-run mode", async () => {
    const rootDir = await createFixtureRoot();
    const calls: string[] = [];

    const fakeRunner: CommandRunner = async (command, args) => {
      calls.push(`${command} ${args.join(" ")}`);

      if (command === "git" && args.join(" ") === "status --porcelain") {
        return " M README.md\n";
      }

      if (
        command === "git" &&
        args.join(" ") === "rev-parse --abbrev-ref HEAD"
      ) {
        return "main\n";
      }

      return "";
    };

    try {
      const result = await publishTask(rootDir, "2026-03-30-demo-task", {
        dryRun: true,
        skipValidate: true,
        runCommand: fakeRunner,
      });

      expect(calls).toEqual([
        "git status --porcelain",
        "git rev-parse --abbrev-ref HEAD",
      ]);
      expect(result.plannedCommands).toEqual([
        {
          args: ["switch", "-c", "codex/2026-03-30-demo-task"],
          command: "git",
        },
        {
          args: ["add", "-A"],
          command: "git",
        },
        {
          args: ["commit", "-m", result.commitMessage],
          command: "git",
        },
        {
          args: ["push", "-u", "origin", "codex/2026-03-30-demo-task"],
          command: "git",
        },
        {
          args: [
            "pr",
            "create",
            "--draft",
            "--title",
            result.prTitle,
            "--body-file",
            "<tempfile>",
          ],
          command: "gh",
        },
      ]);
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });

  it("fails when there are no local changes to publish", async () => {
    const rootDir = await createFixtureRoot();

    const fakeRunner: CommandRunner = async (command, args) => {
      if (command === "git" && args.join(" ") === "status --porcelain") {
        return "";
      }

      if (
        command === "git" &&
        args.join(" ") === "rev-parse --abbrev-ref HEAD"
      ) {
        return "main\n";
      }

      return "";
    };

    try {
      await expect(
        publishTask(rootDir, "2026-03-30-demo-task", {
          dryRun: true,
          skipValidate: true,
          runCommand: fakeRunner,
        }),
      ).rejects.toMatchObject({
        _tag: "NoChangesToPublishError",
      });
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });
});
