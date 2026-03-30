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
  await mkdir(path.join(rootDir, ".github", "ISSUE_TEMPLATE"), {
    recursive: true,
  });
  await mkdir(path.join(rootDir, ".github", "workflows"), { recursive: true });
  await mkdir(path.join(rootDir, "docs"), { recursive: true });
  await mkdir(path.join(rootDir, "rules"), { recursive: true });
  await mkdir(path.join(rootDir, "src"), { recursive: true });

  await writeFile(
    path.join(rootDir, "CLAUDE.md"),
    "# Repository Instructions\n",
  );
  await writeFile(
    path.join(rootDir, "AGENTS.md"),
    [
      '<!-- drift path="CLAUDE.md" hash="" -->',
      "# Agent Instructions",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, ".agents", "docs-refresh.md"),
    "# Docs Refresh\n",
  );
  await writeFile(
    path.join(rootDir, ".agents", "repo-maintenance.md"),
    "# Repo Maintenance\n",
  );
  await writeFile(
    path.join(rootDir, ".agents", "pr-review.md"),
    "# PR Review\n",
  );
  await writeFile(
    path.join(rootDir, ".github", "pull_request_template.md"),
    "## Outcome\n",
  );
  await writeFile(
    path.join(rootDir, ".github", "ISSUE_TEMPLATE", "ai-build-request.yml"),
    "name: AI Build Request\n",
  );
  await writeFile(
    path.join(rootDir, ".github", "ISSUE_TEMPLATE", "config.yml"),
    "blank_issues_enabled: false\n",
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
  await writeFile(
    path.join(rootDir, "docs", "non-coder-workflow.md"),
    [
      "# Workflow",
      "",
      '<!-- drift path=".github/pull_request_template.md" hash="" -->',
      "",
      "This fixture documents the non-coder workflow.",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "docs", "agent-failure-modes.md"),
    [
      "# Failure Modes",
      "",
      '<!-- drift path="src/feature.ts" hash="" -->',
      "",
      "This fixture documents agent failure modes.",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "docs", "template-setup.md"),
    [
      "# Template Setup",
      "",
      '<!-- drift path="CLAUDE.md" hash="" -->',
      "",
      "This fixture documents template setup.",
      "",
    ].join("\n"),
  );

  await stampFile(rootDir, "AGENTS.md");
  await stampFile(rootDir, path.join("docs", "architecture.md"));
  await stampFile(rootDir, path.join("docs", "non-coder-workflow.md"));
  await stampFile(rootDir, path.join("docs", "agent-failure-modes.md"));
  await stampFile(rootDir, path.join("docs", "template-setup.md"));

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
        agentPromptFiles: 3,
        anchoredDocuments: 5,
        guideDocuments: 3,
        instructionFiles: 2,
        issues: [],
        markdownDocuments: 10,
        policyRuleFiles: 1,
        staleAnchors: 0,
        status: "healthy",
        templateFiles: 3,
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
      expect(report.staleAnchors).toBe(2);
      expect(report.issues).toContain("2 drift anchors are stale.");
      expect(report.issues).toContain(
        "Missing required repository file: .github/workflows/nightly-validation.yml",
      );
    } finally {
      await rm(rootDir, { force: true, recursive: true });
    }
  });
});
