import { promises as fs } from "node:fs";
import path from "node:path";

import { normalizePlanTaskId } from "./plan-scaffold.js";

export const REQUIRED_PLAN_FILES = [
  "goal.md",
  "concepts.md",
  "files.md",
  "tasks.md",
  "steps.md",
  "validation.md",
] as const;

const TEMPLATE_PLACEHOLDER_MARKERS = [
  "State what the user should be able to do after this change.",
  "Describe the broken flow, missing behavior, or reason this work exists.",
  "Describe what proof would make this feel correct.",
  "- concept:",
  "  why it matters:",
  "- file:",
  "  why:",
  "- file or area:",
  "  why it should stay untouched:",
  "- task 1",
  "- task 2",
  "- follow-up 1",
  "- assumption 1",
  "- open question 1",
  "1. First implementation step",
  "2. Second implementation step",
  "3. Validation checkpoint",
  "- command:",
  "  expected signal:",
  "- manual check:",
  "  expected result:",
  "- highest-risk area:",
  "- what a human should inspect:",
  "Describe how to undo the change safely if it behaves badly after merge.",
] as const;

export type TaskPlanStatus = "incomplete" | "ready";

export interface TaskPlanAnalysis {
  readonly missingFiles: ReadonlyArray<string>;
  readonly placeholderMarkers: ReadonlyArray<string>;
  readonly status: TaskPlanStatus;
  readonly taskDirectory: string;
  readonly taskId: string;
  readonly unfilledFiles: ReadonlyArray<string>;
}

export async function analyzeTaskPlan(
  rootDir: string,
  taskId: string,
): Promise<TaskPlanAnalysis> {
  const normalizedTaskId = normalizePlanTaskId(taskId);
  const taskDirectory = path.join(rootDir, "plans", normalizedTaskId);
  const missingFiles = await findMissingPlanFiles(taskDirectory);
  const unfilledPlan =
    missingFiles.length > 0
      ? {
          placeholderMarkers: [] as string[],
          unfilledFiles: [] as string[],
        }
      : await findUnfilledPlanFiles(rootDir, taskDirectory);

  return {
    missingFiles,
    placeholderMarkers: unfilledPlan.placeholderMarkers,
    status:
      missingFiles.length === 0 && unfilledPlan.unfilledFiles.length === 0
        ? "ready"
        : "incomplete",
    taskDirectory,
    taskId: normalizedTaskId,
    unfilledFiles: unfilledPlan.unfilledFiles,
  };
}

export async function listTaskPlans(
  rootDir: string,
): Promise<TaskPlanAnalysis[]> {
  const plansDirectory = path.join(rootDir, "plans");
  const entries = await fs.readdir(plansDirectory, { withFileTypes: true });
  const taskDirectories = entries
    .filter((entry) => entry.isDirectory() && entry.name !== "_template")
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  return Promise.all(
    taskDirectories.map((taskId) => analyzeTaskPlan(rootDir, taskId)),
  );
}

async function findMissingPlanFiles(taskDirectory: string): Promise<string[]> {
  const missingFiles: string[] = [];

  for (const requiredFile of REQUIRED_PLAN_FILES) {
    const absolutePath = path.join(taskDirectory, requiredFile);

    try {
      await fs.access(absolutePath);
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        missingFiles.push(requiredFile);
        continue;
      }

      throw error;
    }
  }

  return missingFiles;
}

async function findUnfilledPlanFiles(
  rootDir: string,
  taskDirectory: string,
): Promise<{
  placeholderMarkers: string[];
  unfilledFiles: string[];
}> {
  const unfilledFiles = new Set<string>();
  const placeholderMarkers = new Set<string>();
  const templateDirectory = path.join(rootDir, "plans", "_template");

  for (const requiredFile of REQUIRED_PLAN_FILES) {
    const taskFilePath = path.join(taskDirectory, requiredFile);
    const templateFilePath = path.join(templateDirectory, requiredFile);
    const [taskContent, templateContent] = await Promise.all([
      fs.readFile(taskFilePath, "utf8"),
      fs.readFile(templateFilePath, "utf8"),
    ]);

    if (taskContent.trim() === templateContent.trim()) {
      unfilledFiles.add(requiredFile);
      placeholderMarkers.add("<file matches template>");
      continue;
    }

    const taskLines = taskContent.split("\n").map((line) => line.trimEnd());

    for (const marker of TEMPLATE_PLACEHOLDER_MARKERS) {
      if (taskLines.includes(marker)) {
        unfilledFiles.add(requiredFile);
        placeholderMarkers.add(marker);
      }
    }
  }

  return {
    placeholderMarkers: [...placeholderMarkers],
    unfilledFiles: [...unfilledFiles],
  };
}
