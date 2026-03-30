import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { scaffoldPlan } from "../src/lib/plan-scaffold.js";

async function createFixtureRoot(): Promise<string> {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "plan-scaffold-"));

  await mkdir(path.join(rootDir, "plans", "_template"), { recursive: true });

  await writeFile(
    path.join(rootDir, "plans", "_template", "goal.md"),
    "# Goal\n",
  );
  await writeFile(
    path.join(rootDir, "plans", "_template", "concepts.md"),
    "# Concepts\n",
  );
  await writeFile(
    path.join(rootDir, "plans", "_template", "files.md"),
    "# Files\n",
  );
  await writeFile(
    path.join(rootDir, "plans", "_template", "tasks.md"),
    "# Tasks\n",
  );
  await writeFile(
    path.join(rootDir, "plans", "_template", "steps.md"),
    "# Steps\n",
  );
  await writeFile(
    path.join(rootDir, "plans", "_template", "validation.md"),
    "# Validation\n",
  );

  return rootDir;
}

describe("scaffoldPlan", () => {
  it("creates a new task plan from the template", async () => {
    const rootDir = await createFixtureRoot();

    try {
      const result = await scaffoldPlan(rootDir, "2026-03-30-demo-task");

      expect(result).toEqual({
        filesCreated: 6,
        taskDirectory: path.join(rootDir, "plans", "2026-03-30-demo-task"),
        taskId: "2026-03-30-demo-task",
      });

      const copiedGoal = await readFile(
        path.join(result.taskDirectory, "goal.md"),
        "utf8",
      );
      const copiedConcepts = await readFile(
        path.join(result.taskDirectory, "concepts.md"),
        "utf8",
      );

      expect(copiedGoal).toBe("# Goal\n");
      expect(copiedConcepts).toBe("# Concepts\n");
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });

  it("refuses to overwrite an existing task plan", async () => {
    const rootDir = await createFixtureRoot();

    try {
      await mkdir(path.join(rootDir, "plans", "2026-03-30-demo-task"));

      await expect(
        scaffoldPlan(rootDir, "2026-03-30-demo-task"),
      ).rejects.toMatchObject({
        _tag: "PlanAlreadyExistsError",
        taskDirectory: path.join(rootDir, "plans", "2026-03-30-demo-task"),
      });
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });

  it("rejects invalid task ids", async () => {
    const rootDir = await createFixtureRoot();

    try {
      await expect(scaffoldPlan(rootDir, "../oops")).rejects.toMatchObject({
        _tag: "InvalidPlanTaskIdError",
        taskId: "../oops",
      });
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });
});
