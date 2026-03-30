# File Localization

## Confirmed Files

- `package.json`
  why: expose the new CLI command
- `scripts/list-plans.ts`
  why: provide the terminal entrypoint
- `src/lib/task-plan.ts`
  why: centralize reusable task-plan analysis
- `src/lib/task-publish.ts`
  why: reuse the shared plan analysis instead of duplicating logic
- `test/task-plan.test.ts`
  why: cover readiness analysis and listing behavior
- `README.md`
  why: document the new command
- `plans/README.md`
  why: explain how to inspect task readiness
- `CLAUDE.md`
  why: keep the canonical repo workflow commands aligned
- `AGENTS.md`
  why: mirror the repo workflow command for other agent tools

## Candidate Files

- `docs/non-coder-workflow.md`
  why: non-coder operators may need the command in their workflow
- `docs/agent-reasoning-workflow.md`
  why: may need one line about checking plan readiness before coding or publishing
- `docs/agent-failure-modes.md`
  why: docs drift anchors may restamp when shared publish logic changes
- `docs/architecture.md`
  why: docs drift anchors may restamp when the CLI and publish modules change
- `docs/template-setup.md`
  why: docs drift anchors may restamp when the repo workflow changes
- `plans/2026-03-30-first-real-feature/`
  why: update the current task plan and validation as implementation progresses

## Files To Avoid

- `src/services/greeting-service.ts`
  why it should stay untouched: unrelated demo behavior
- `src/services/repository-health-service.ts`
  why it should stay untouched: this feature does not need a health model change
