import { collectAnchors, stampFile } from "../src/lib/docs-drift.js";

async function main(): Promise<void> {
  const rootDir = process.cwd();
  const anchors = await collectAnchors(rootDir);
  const markdownPaths = [
    ...new Set(anchors.map((anchor) => anchor.markdownPath)),
  ];

  for (const markdownPath of markdownPaths) {
    await stampFile(rootDir, markdownPath);
    process.stdout.write(`Stamped ${markdownPath}\n`);
  }
}

await main();
