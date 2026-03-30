# File Localization

## Confirmed Files

- `package.json`
  why: expose the publish command
- `scripts/publish-task.ts`
  why: provide the CLI entrypoint for users and agents
- `src/lib/task-publish.ts`
  why: keep publish logic reusable and testable
- `test/task-publish.test.ts`
  why: cover metadata generation, dry-run behavior, and placeholder-plan rejection
- `plans/README.md`
  why: document when to use the publish command
- `README.md`
  why: show the full plan-to-publish workflow
- `docs/agent-reasoning-workflow.md`
  why: explain the publish step after implementation and validation
- `docs/architecture.md`
  why: document the new reusable boundary

## Candidate Files

- `docs/non-coder-workflow.md`
  why: non-coder operators should know that the final step becomes a draft PR instead of a local-only change
- `docs/template-setup.md`
  why: first-time repo users should see the end-to-end workflow
- `CLAUDE.md`
  why: repo instructions may need to mention when to publish versus when to stop at local validation

## Files To Avoid

- `src/services/greeting-service.ts`
  why it should stay untouched: unrelated demo behavior
- `src/services/repository-health-service.ts`
  why it should stay untouched: the repo health model already covers the needed scaffolding for this feature
