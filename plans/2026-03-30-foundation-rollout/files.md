# File Localization

## Confirmed Files

- `README.md`
  why: documents the end-to-end starter workflow
- `CLAUDE.md`
  why: defines the canonical repo contract
- `AGENTS.md`
  why: mirrors the repo contract for tools that read this file
- `.agents/`
  why: stores the role prompts and review assets
- `.memory/`
  why: stores repository memory and stable patterns
- `.github/ISSUE_TEMPLATE/ai-build-request.yml`
  why: captures better task intake
- `.github/pull_request_template.md`
  why: captures AI disclosure, evidence, and rollback expectations
- `docs/`
  why: contains the workflow, evaluation, memory, and setup guides
- `plans/`
  why: contains task templates plus completed rollout plans
- `package.json`
  why: exposes `plan:new` and `task:publish`
- `scripts/`
  why: contains the CLI entrypoints
- `src/lib/`
  why: contains reusable plan and publish logic
- `src/services/repository-health-service.ts`
  why: enforces the repo scaffolding
- `test/`
  why: covers the new commands and health checks

## Candidate Files

- `docs/background-agents.md`
  why: already part of the broader workflow and may need anchor updates
- `docs/agent-failure-modes.md`
  why: part of the non-coder operating model and may need consistency updates

## Files To Avoid

- `src/services/greeting-service.ts`
  why it should stay untouched: unrelated demo logic
- `src/config/env.ts`
  why it should stay untouched: environment handling is not part of this rollout
