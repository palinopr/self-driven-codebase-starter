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
  await mkdir(path.join(rootDir, ".memory"), { recursive: true });
  await mkdir(path.join(rootDir, ".github", "ISSUE_TEMPLATE"), {
    recursive: true,
  });
  await mkdir(path.join(rootDir, ".github", "workflows"), { recursive: true });
  await mkdir(path.join(rootDir, "docs"), { recursive: true });
  await mkdir(path.join(rootDir, "plans", "_template"), { recursive: true });
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
    path.join(rootDir, ".agents", "experimenter.md"),
    "# Experimenter\n",
  );
  await writeFile(path.join(rootDir, ".agents", "manager.md"), "# Manager\n");
  await writeFile(
    path.join(rootDir, ".agents", "onboarding.md"),
    "# Onboarding\n",
  );
  await writeFile(
    path.join(rootDir, ".agents", "repo-maintenance.md"),
    "# Repo Maintenance\n",
  );
  await writeFile(path.join(rootDir, ".agents", "reviewer.md"), "# Reviewer\n");
  await writeFile(
    path.join(rootDir, ".agents", "pr-review.md"),
    "# PR Review\n",
  );
  await writeFile(path.join(rootDir, ".agents", "worker.md"), "# Worker\n");
  await writeFile(
    path.join(rootDir, ".memory", "repository-skills.md"),
    "# Repository Skills\n",
  );
  await writeFile(
    path.join(rootDir, ".memory", "maintainer-preferences.md"),
    "# Maintainer Preferences\n",
  );
  await writeFile(
    path.join(rootDir, ".memory", "patterns.json"),
    '{\n  "lastReviewedOn": "2026-03-30"\n}\n',
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
    path.join(rootDir, "docs", "background-agents.md"),
    [
      "# Background Agents",
      "",
      '<!-- drift path=".agents/repo-maintenance.md" hash="" -->',
      "",
      "This fixture documents the background-agent scaffold.",
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
    path.join(rootDir, "docs", "agent-eval-workflow.md"),
    [
      "# Agent Eval Workflow",
      "",
      '<!-- drift path=".agents/experimenter.md" hash="" -->',
      "",
      "This fixture documents experiment evaluation.",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "docs", "agent-reasoning-workflow.md"),
    [
      "# Agent Reasoning Workflow",
      "",
      '<!-- drift path="plans/_template/concepts.md" hash="" -->',
      "",
      '<!-- drift path="plans/_template/goal.md" hash="" -->',
      "",
      "This fixture documents staged reasoning.",
      "",
    ].join("\n"),
  );
  await writeFile(
    path.join(rootDir, "docs", "repository-memory.md"),
    [
      "# Repository Memory",
      "",
      '<!-- drift path=".memory/repository-skills.md" hash="" -->',
      "",
      "This fixture documents repository memory.",
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
  await writeFile(path.join(rootDir, "plans", "README.md"), "# Task Plans\n");
  await writeFile(
    path.join(rootDir, "plans", "_template", "concepts.md"),
    "# Concepts\n",
  );
  await writeFile(
    path.join(rootDir, "plans", "_template", "goal.md"),
    "# Goal\n",
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

  await stampFile(rootDir, "AGENTS.md");
  await stampFile(rootDir, path.join("docs", "architecture.md"));
  await stampFile(rootDir, path.join("docs", "background-agents.md"));
  await stampFile(rootDir, path.join("docs", "non-coder-workflow.md"));
  await stampFile(rootDir, path.join("docs", "agent-failure-modes.md"));
  await stampFile(rootDir, path.join("docs", "agent-eval-workflow.md"));
  await stampFile(rootDir, path.join("docs", "agent-reasoning-workflow.md"));
  await stampFile(rootDir, path.join("docs", "repository-memory.md"));
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
        agentPromptFiles: 8,
        anchoredDocuments: 9,
        guideDocuments: 7,
        instructionFiles: 2,
        issues: [],
        memoryFiles: 3,
        markdownDocuments: 28,
        planTemplateFiles: 7,
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
