import { collectAnchors } from "../src/lib/docs-drift.js";

async function main(): Promise<void> {
  const rootDir = process.cwd();
  const anchors = await collectAnchors(rootDir);
  const mismatches = anchors.filter(
    (anchor) =>
      anchor.actualHash === null || anchor.actualHash !== anchor.storedHash,
  );

  if (mismatches.length === 0) {
    process.stdout.write("Docs drift check passed.\n");
    return;
  }

  process.stderr.write("Docs drift check failed.\n");

  for (const mismatch of mismatches) {
    const target =
      mismatch.actualHash === null ? "missing file" : mismatch.actualHash;

    process.stderr.write(
      `- ${mismatch.markdownPath} is stale for ${mismatch.targetPath} (stored ${mismatch.storedHash}, actual ${target}).\n`,
    );
  }

  process.stderr.write(
    "Run npm run docs:stamp after reviewing the affected markdown.\n",
  );
  process.exitCode = 1;
}

await main();
