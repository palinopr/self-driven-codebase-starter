import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { analyzeTaskPlan, listTaskPlans } from "../src/lib/task-plan.js";

const TEST_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));

async function createFixtureRoot(): Promise<string> {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "task-plan-"));
  const templateSource = path.resolve(
    TEST_DIRECTORY,
    "..",
    "plans",
    "_template",
  );

  await cp(templateSource, path.join(rootDir, "plans", "_template"), {
    recursive: true,
  });

  await mkdir(path.join(rootDir, "plans", "2026-03-30-ready-task"), {
    recursive: true,
  });
  await mkdir(path.join(rootDir, "plans", "2026-03-30-incomplete-task"), {
    recursive: true,
  });

  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-ready-task", "goal.md"),
    [
      "# Goal",
      "",
      "## User Outcome",
      "",
      "A user can see a ready task in the plans list.",
      "",
      "## Current Problem",
      "",
      "There is no plan listing yet.",
      "",
      "## Constraints",
      "",
      "- keep it local",
      "",
      "## Non-Goals",
      "",
      "- no mutation",
      "",
      "## Acceptance Evidence",
      "",
      "The command shows this task as ready.",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-ready-task", "concepts.md"),
    [
      "# Concepts",
      "",
      "## Domain Concepts",
      "",
      "- readiness",
      "  why it matters: users need a clear signal",
      "",
      "## Evaluation Concepts",
      "",
      "- development metric:",
      "  why it matters: the command should print a ready label",
      "- held-out evaluation:",
      "  why it matters: tests verify status",
      "- stop condition:",
      "  why it matters: the output is clear",
      "- reward-hacking risk:",
      "  why it matters: template text should not count as ready",
      "",
      "## Concepts Out Of Scope",
      "",
      "- dashboards",
      "  why it should not drive this task: CLI only",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-ready-task", "files.md"),
    [
      "# File Localization",
      "",
      "## Confirmed Files",
      "",
      "- `README.md`",
      "  why: command docs",
      "",
      "## Candidate Files",
      "",
      "- `plans/2026-03-30-ready-task/`",
      "  why: plan updates",
      "",
      "## Files To Avoid",
      "",
      "- `src/services/greeting-service.ts`",
      "  why it should stay untouched: unrelated",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-ready-task", "tasks.md"),
    [
      "# Implementation Tasks",
      "",
      "## Must Do",
      "",
      "- add the command",
      "",
      "## Optional Follow-Ups",
      "",
      "- add json later",
      "",
      "## Open Questions And Assumptions",
      "",
      "- assumption: plain text is enough",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-ready-task", "steps.md"),
    [
      "# Step Decomposition",
      "",
      "1. Add the command.",
      "2. Add tests.",
      "3. Run validation.",
      "",
      "## Scope Change Rule",
      "",
      "If scope grows, record it here first.",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "plans", "2026-03-30-ready-task", "validation.md"),
    [
      "# Validation",
      "",
      "## Automated Checks",
      "",
      "- command: `npm run test -- task-plan`",
      "  expected signal: tests pass",
      "",
      "## Manual Checks",
      "",
      "- manual check: run the command",
      "  expected result: it prints ready",
      "",
      "## Review Focus",
      "",
      "- highest-risk area: placeholder detection",
      "- what a human should inspect: output readability",
      "",
      "## Rollback Notes",
      "",
      "Remove the command and task-plan module together.",
      "",
    ].join("\n"),
  );

  await cp(
    path.join(rootDir, "plans", "_template"),
    path.join(rootDir, "plans", "2026-03-30-incomplete-task"),
    { recursive: true },
  );

  return rootDir;
}

describe("analyzeTaskPlan", () => {
  it("reports missing required plan files without reading placeholder content", async () => {
    const rootDir = await createFixtureRoot();

    try {
      await rm(
        path.join(rootDir, "plans", "2026-03-30-ready-task", "steps.md"),
      );

      const analysis = await analyzeTaskPlan(rootDir, "2026-03-30-ready-task");

      expect(analysis.status).toBe("incomplete");
      expect(analysis.missingFiles).toEqual(["steps.md"]);
      expect(analysis.unfilledFiles).toEqual([]);
      expect(analysis.placeholderMarkers).toEqual([]);
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });

  it("marks a filled task as ready", async () => {
    const rootDir = await createFixtureRoot();

    try {
      const analysis = await analyzeTaskPlan(rootDir, "2026-03-30-ready-task");

      expect(analysis.status).toBe("ready");
      expect(analysis.missingFiles).toEqual([]);
      expect(analysis.unfilledFiles).toEqual([]);
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });

  it("marks a template task as incomplete", async () => {
    const rootDir = await createFixtureRoot();

    try {
      const analysis = await analyzeTaskPlan(
        rootDir,
        "2026-03-30-incomplete-task",
      );

      expect(analysis.status).toBe("incomplete");
      expect(analysis.unfilledFiles.length).toBeGreaterThan(0);
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });
});

describe("listTaskPlans", () => {
  it("lists ready and incomplete task plans in name order", async () => {
    const rootDir = await createFixtureRoot();

    try {
      const analyses = await listTaskPlans(rootDir);

      expect(
        analyses.map((analysis) => [analysis.taskId, analysis.status]),
      ).toEqual([
        ["2026-03-30-incomplete-task", "incomplete"],
        ["2026-03-30-ready-task", "ready"],
      ]);
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });
});
