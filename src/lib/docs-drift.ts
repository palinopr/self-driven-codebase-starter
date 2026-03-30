import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const DRIFT_PATTERN = /<!--\s*drift\s+path="([^"]+)"\s+hash="([^"]*)"\s*-->/g;

class MissingDriftTargetError extends Error {
  constructor(markdownPath: string, targetPath: string) {
    super(`Cannot stamp ${markdownPath} because ${targetPath} does not exist.`);
    this.name = "MissingDriftTargetError";
  }
}

export interface DriftAnchor {
  readonly actualHash: string | null;
  readonly markdownPath: string;
  readonly storedHash: string;
  readonly targetPath: string;
}

export async function listMarkdownFiles(rootDir: string): Promise<string[]> {
  const results: string[] = [];

  async function walk(currentDir: string): Promise<void> {
    const entries = await fs.readdir(currentDir, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      if (
        entry.name === ".git" ||
        entry.name === "dist" ||
        entry.name === "node_modules"
      ) {
        continue;
      }

      const absolutePath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }

      if (entry.isFile() && absolutePath.endsWith(".md")) {
        results.push(absolutePath);
      }
    }
  }

  await walk(rootDir);

  return results.sort();
}

export async function collectAnchors(rootDir: string): Promise<DriftAnchor[]> {
  const markdownFiles = await listMarkdownFiles(rootDir);
  const anchors: DriftAnchor[] = [];

  for (const markdownFile of markdownFiles) {
    const content = await fs.readFile(markdownFile, "utf8");
    const matches = content.matchAll(DRIFT_PATTERN);

    for (const match of matches) {
      const targetPath = match[1];
      const storedHash = match[2];

      if (targetPath === undefined || storedHash === undefined) {
        continue;
      }

      const absoluteTargetPath = path.resolve(rootDir, targetPath);
      const actualHash = await readFileHash(absoluteTargetPath);

      anchors.push({
        actualHash,
        markdownPath: path.relative(rootDir, markdownFile),
        storedHash,
        targetPath,
      });
    }
  }

  return anchors;
}

export async function stampFile(
  rootDir: string,
  markdownPath: string,
): Promise<void> {
  const absoluteMarkdownPath = path.resolve(rootDir, markdownPath);
  const currentContent = await fs.readFile(absoluteMarkdownPath, "utf8");

  const nextContent = await replaceAsync(
    currentContent,
    DRIFT_PATTERN,
    async (_match, targetPath) => {
      const absoluteTargetPath = path.resolve(rootDir, targetPath);
      const nextHash = await readFileHash(absoluteTargetPath);

      if (nextHash === null) {
        throw new MissingDriftTargetError(markdownPath, targetPath);
      }

      return `<!-- drift path="${targetPath}" hash="${nextHash}" -->`;
    },
  );

  await fs.writeFile(absoluteMarkdownPath, nextContent);
}

async function readFileHash(filePath: string): Promise<string | null> {
  try {
    const content = await fs.readFile(filePath, "utf8");

    return createHash("sha256").update(content).digest("hex").slice(0, 16);
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

function isNodeError(
  error: unknown,
): error is NodeJS.ErrnoException & { readonly code: string } {
  return error instanceof Error && "code" in error;
}

async function replaceAsync(
  input: string,
  pattern: RegExp,
  replacer: (
    match: string,
    targetPath: string,
    storedHash: string,
  ) => Promise<string>,
): Promise<string> {
  const matches = [...input.matchAll(pattern)];

  if (matches.length === 0) {
    return input;
  }

  let result = "";
  let lastIndex = 0;

  for (const match of matches) {
    const [fullMatch, targetPath, storedHash] = match;
    const startIndex = match.index ?? 0;

    if (
      fullMatch === undefined ||
      targetPath === undefined ||
      storedHash === undefined
    ) {
      continue;
    }

    result += input.slice(lastIndex, startIndex);
    result += await replacer(fullMatch, targetPath, storedHash);
    lastIndex = startIndex + fullMatch.length;
  }

  result += input.slice(lastIndex);

  return result;
}
