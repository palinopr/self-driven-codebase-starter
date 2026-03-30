# File Localization

## Confirmed Files

- `package.json`
  why: add a user-facing command
- `scripts/`
  why: add the executable CLI entrypoint
- `src/`
  why: place reusable plan-scaffolding logic in application code instead of only in a script
- `test/`
  why: cover plan scaffolding behavior
- `README.md`
  why: document the new command
- `docs/template-setup.md`
  why: setup instructions should mention the easier plan creation path
- `docs/non-coder-workflow.md`
  why: non-coder workflow should point to the command
- `docs/architecture.md`
  why: explain the new boundary if a reusable module is added

## Candidate Files

- `docs/agent-reasoning-workflow.md`
  why: may need a note that plan scaffolding can be automated with a command
- `plans/README.md`
  why: may need the command documented alongside manual copying

## Files To Avoid

- `src/services/greeting-service.ts`
  why it should stay untouched: unrelated demo behavior
- `src/services/repository-health-service.ts`
  why it should stay untouched: this feature does not change health rules
