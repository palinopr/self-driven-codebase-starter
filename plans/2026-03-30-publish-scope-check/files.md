# File Localization

## Confirmed Files

- `src/lib/task-publish.ts`
  why: implement scope parsing and changed-file enforcement
- `test/task-publish.test.ts`
  why: add regression coverage for in-scope and out-of-scope publish behavior
- `plans/README.md`
  why: document the new enforcement in the task workflow
- `docs/agent-reasoning-workflow.md`
  why: explain that publish checks file scope against the task plan
- `README.md`
  why: show the stronger publish gate in the main starter workflow

## Candidate Files

- `CLAUDE.md`
  why: repo contract may need one line about `files.md` enforcement
- `AGENTS.md`
  why: mirror any repo-contract update for tools that read this file
- `plans/2026-03-30-publish-scope-check/`
  why: update the current task plan and validation artifacts as implementation and checks progress

## Files To Avoid

- `src/services/greeting-service.ts`
  why it should stay untouched: unrelated demo behavior
- `src/services/repository-health-service.ts`
  why it should stay untouched: this feature should not require a health model change
