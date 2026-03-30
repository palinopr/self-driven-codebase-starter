# Background Agents

<!-- drift path=".github/workflows/nightly-validation.yml" hash="bcd9719434f1cd29" -->
<!-- drift path=".agents/repo-maintenance.md" hash="3c4e0a6ab3b4dade" -->
<!-- drift path=".agents/docs-refresh.md" hash="8dd4afaa413580e7" -->
<!-- drift path=".agents/pr-review.md" hash="d13e7a9ae9f227ba" -->
<!-- drift path=".agents/manager.md" hash="ba30a21a5c5dec2e" -->
<!-- drift path=".agents/worker.md" hash="916f6abd526f8800" -->
<!-- drift path=".agents/reviewer.md" hash="9b53865660406b4f" -->
<!-- drift path=".agents/onboarding.md" hash="626e3476c68a6f92" -->
<!-- drift path=".agents/experimenter.md" hash="ff1dcf37254bc475" -->

This repository is only scaffolded for background agents, not fully wired to an external service.

## What Exists Now

- a nightly validation workflow that runs the full health check
- prompt assets in `.agents/` for onboarding, planning, implementation, review, maintenance, and docs-refresh work
- prompt assets for experiment and red-team evaluation work
- a `plans/` template so multi-step work has a written file scope before edits
- a `.memory/` directory so agents can reuse repo-specific habits instead of guessing
- repo-level instructions in `CLAUDE.md`
- hard validation gates in `npm run validate`

## Safe Starting Tasks

Background agents in this repository should start with:

- onboarding and file-scope mapping
- plan creation or plan tightening
- validation triage
- docs refresh when anchors drift
- narrow maintenance updates

They should not start with:

- broad refactors
- policy rewrites
- auto-merge behavior
- production-connected actions

## Suggested Role Split

- `onboarding.md`: summarize the repo rules, memory, and likely file scope
- `manager.md`: turn the request into `plans/<task-id>/...`
- `worker.md`: implement only the approved plan
- `reviewer.md`: compare the diff against the plan and the evidence
- `pr-review.md`: do the final skeptical pass before merge
- `experimenter.md`: design experiments with visible metrics, held-out evaluation, and reward-hacking checks

## Human Checkpoint

Every background-agent run should end in a human-reviewed pull request or validation report.
