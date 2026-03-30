import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { Effect } from "effect";

import { stampFile } from "../src/lib/docs-drift.js";
import {
  RepositoryHealthRuntimeTest,
  inspectRepositoryHealth,
} from "../src/services/repository-health-service.js";

async function createFixtureRoot(): Promise<string> {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "repo-health-"));

  await mkdir(path.join(rootDir, ".agents"), { recursive: true });
  await mkdir(path.join(rootDir, ".github", "workflows"), { recursive: true });
  await mkdir(path.join(rootDir, "docs"), { recursive: true });
  await mkdir(path.join(rootDir, "rules"), { recursive: true });
  await mkdir(path.join(rootDir, "src"), { recursive: true });

  await writeFile(
    path.join(rootDir, ".agents", "docs-refresh.md"),
    "# Docs Refresh\n",
  );
  await writeFile(
    path.join(rootDir, ".agents", "repo-maintenance.md"),
    "# Repo Maintenance\n",
  );
  await writeFile(
    path.join(rootDir, ".github", "workflows", "ci.yml"),
    "name: CI\n",
  );
  await writeFile(
    path.join(rootDir, ".github", "workflows", "nightly-validation.yml"),
    "name: Nightly Validation\n",
  );
  await writeFile(path.join(rootDir, "rules", "example.yml"), "id: example\n");
  await writeFile(
    path.join(rootDir, "src", "feature.ts"),
    "export const featureName = 'repo-health';\n",
  );
  await writeFile(
    path.join(rootDir, "docs", "architecture.md"),
    [
      "# Fixture",
      "",
      '<!-- drift path="src/feature.ts" hash="" -->',
      "",
      "This fixture documents the feature module.",
      "",
    ].join("\n"),
  );

  await stampFile(rootDir, path.join("docs", "architecture.md"));

  return rootDir;
}

describe("inspectRepositoryHealth", () => {
  it("reports a healthy repository when the required scaffold exists", async () => {
    const rootDir = await createFixtureRoot();

    try {
      const report = await Effect.runPromise(
        inspectRepositoryHealth(rootDir).pipe(
          Effect.provide(RepositoryHealthRuntimeTest),
        ),
      );

      expect(report).toEqual({
        agentPromptFiles: 2,
        anchoredDocuments: 1,
        issues: [],
        markdownDocuments: 3,
        policyRuleFiles: 1,
        staleAnchors: 0,
        status: "healthy",
        workflowFiles: 2,
      });
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });

  it("reports stale anchors and missing workflows", async () => {
    const rootDir = await createFixtureRoot();

    try {
      await rm(
        path.join(rootDir, ".github", "workflows", "nightly-validation.yml"),
      );
      await writeFile(
        path.join(rootDir, "src", "feature.ts"),
        "export const featureName = 'drifted';\n",
      );

      const report = await Effect.runPromise(
        inspectRepositoryHealth(rootDir).pipe(
          Effect.provide(RepositoryHealthRuntimeTest),
        ),
      );

      expect(report.status).toBe("needs-attention");
      expect(report.staleAnchors).toBe(1);
      expect(report.issues).toContain("1 drift anchor is stale.");
      expect(report.issues).toContain(
        "Missing required repository file: .github/workflows/nightly-validation.yml",
      );
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });
});
