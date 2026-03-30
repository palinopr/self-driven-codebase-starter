import { promises as fs } from "node:fs";
import path from "node:path";

const TASK_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

export interface PlanScaffoldResult {
  readonly filesCreated: number;
  readonly taskDirectory: string;
  readonly taskId: string;
}

export class InvalidPlanTaskIdError extends Error {
  readonly _tag = "InvalidPlanTaskIdError";

  constructor(readonly taskId: string) {
    super(
      `Task id "${taskId}" is invalid. Use a single folder name with letters, numbers, dots, underscores, or hyphens.`,
    );
    this.name = "InvalidPlanTaskIdError";
  }
}

export class PlanTemplateMissingError extends Error {
  readonly _tag = "PlanTemplateMissingError";

  constructor(readonly templateDirectory: string) {
    super(`Plan template directory is missing: ${templateDirectory}`);
    this.name = "PlanTemplateMissingError";
  }
}

export class PlanAlreadyExistsError extends Error {
  readonly _tag = "PlanAlreadyExistsError";

  constructor(readonly taskDirectory: string) {
    super(`Plan directory already exists: ${taskDirectory}`);
    this.name = "PlanAlreadyExistsError";
  }
}

export async function scaffoldPlan(
  rootDir: string,
  taskId: string,
): Promise<PlanScaffoldResult> {
  const normalizedTaskId = taskId.trim();

  if (
    !TASK_ID_PATTERN.test(normalizedTaskId) ||
    normalizedTaskId === "_template"
  ) {
    throw new InvalidPlanTaskIdError(taskId);
  }

  const templateDirectory = path.join(rootDir, "plans", "_template");
  const taskDirectory = path.join(rootDir, "plans", normalizedTaskId);

  if (!(await pathExists(templateDirectory))) {
    throw new PlanTemplateMissingError(templateDirectory);
  }

  if (await pathExists(taskDirectory)) {
    throw new PlanAlreadyExistsError(taskDirectory);
  }

  await fs.cp(templateDirectory, taskDirectory, {
    errorOnExist: true,
    force: false,
    recursive: true,
  });

  return {
    filesCreated: await countFilesRecursively(taskDirectory),
    taskDirectory,
    taskId: normalizedTaskId,
  };
}

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

async function countFilesRecursively(directoryPath: string): Promise<number> {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  let files = 0;

  for (const entry of entries) {
    const absolutePath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      files += await countFilesRecursively(absolutePath);
      continue;
    }

    if (entry.isFile()) {
      files += 1;
    }
  }

  return files;
}
