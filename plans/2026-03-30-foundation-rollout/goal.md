# Goal

## User Outcome

Repo users should have a complete starter workflow for planning, validating, remembering, and publishing AI-assisted work from issue to draft PR.

## Current Problem

The starter had validation and a small service slice, but it still lacked the full operating system around agent work:

- no checked-in repository memory
- no role prompts for planning and review
- no stage-aware task artifacts
- no evaluation guidance for experiment-heavy work
- no simple command to scaffold plans
- no simple command to publish a completed task as a draft PR

## Constraints

- keep the system repo-level and reusable for future projects
- preserve non-coder readability
- keep validation and repo health green
- make the workflow explicit instead of relying on agent memory

## Non-Goals

- do not build product-specific business features yet
- do not add auto-merge or fully autonomous deployment
- do not replace human review with model confidence

## Acceptance Evidence

- the repo contains planning, memory, evaluation, and role-prompt scaffolding
- users can run `npm run plan:new -- <task-id>` to start a task
- users can run `npm run task:publish -- <task-id>` to open a draft PR workflow
- `npm run validate` and `npm run demo:health` pass
