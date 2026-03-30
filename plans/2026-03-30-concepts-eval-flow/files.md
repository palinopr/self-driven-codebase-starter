# File Localization

## Confirmed Files

- `plans/README.md`
  why: the planning instructions need to mention the new concepts artifact
- `plans/_template/goal.md`
  why: the base goal template should reference concepts where appropriate
- `docs/agent-reasoning-workflow.md`
  why: the staged workflow needs to include concepts explicitly
- `README.md`
  why: the top-level template description should mention the upgraded planning and eval flow
- `CLAUDE.md`
  why: repo instructions should require concept-aware planning and evaluation discipline
- `AGENTS.md`
  why: mirrored instructions must stay aligned with `CLAUDE.md`
- `.agents/manager.md`
  why: the planning role should produce concept-aware artifacts
- `.agents/worker.md`
  why: implementation should consume concepts and record evaluation outcomes
- `src/services/repository-health-service.ts`
  why: the repo health check should require the new prompt and docs scaffold
- `test/repository-health-service.test.ts`
  why: the health-check fixture must cover the new files

## Candidate Files

- `.github/pull_request_template.md`
  why: the PR flow may need an explicit field for domain concepts and held-out evaluation
- `docs/background-agents.md`
  why: the role split may need an experimenter or red-team role
- `docs/template-setup.md`
  why: setup instructions may need to mention the new workflow

## Files To Avoid

- `src/services/greeting-service.ts`
  why it should stay untouched: unrelated demo behavior
- `rules/`
  why it should stay untouched: no new structural code policy is needed for this feature
