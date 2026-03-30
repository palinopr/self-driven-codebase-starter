# Background Agents

<!-- drift path=".github/workflows/nightly-validation.yml" hash="bcd9719434f1cd29" -->
<!-- drift path=".agents/repo-maintenance.md" hash="0313ace025a559f1" -->
<!-- drift path=".agents/docs-refresh.md" hash="8dd4afaa413580e7" -->
<!-- drift path=".agents/pr-review.md" hash="ffe9ad9bb8f04245" -->

This repository is only scaffolded for background agents, not fully wired to an external service.

## What Exists Now

- a nightly validation workflow that runs the full health check
- prompt assets in `.agents/` for maintenance, review, and docs-refresh work
- repo-level instructions in `CLAUDE.md`
- hard validation gates in `npm run validate`

## Safe Starting Tasks

Background agents in this repository should start with:

- validation triage
- docs refresh when anchors drift
- narrow maintenance updates

They should not start with:

- broad refactors
- policy rewrites
- auto-merge behavior
- production-connected actions

## Human Checkpoint

Every background-agent run should end in a human-reviewed pull request or validation report.
