# Repository Instructions

## Workflow

- Use `npm run validate` before considering work complete.
- Keep changes scoped. Prefer one feature or fix per pull request.
- For feature work or any multi-file change, create or update `plans/<task-id>/goal.md`, `concepts.md`, `files.md`, `tasks.md`, `steps.md`, and `validation.md` before broad edits.
- Use `npm run plan:new -- <task-id>` to scaffold a new task plan instead of copying template files by hand.
- When a task is implemented and validated, use `npm run task:publish -- <task-id>` to create a draft PR instead of stopping at local-only changes.
- Add or update tests when behavior changes.
- Update docs when commands, structure, or user-visible behavior changes.
- Update `.memory/` only when a repo pattern is stable enough to reuse, not for one-off notes.
- Run `npm run docs:stamp` only after reviewing and updating anchored markdown.
- Use the issue and PR templates when creating new work or reviewing finished work.
- Keep AI-assisted pull requests explicit about the tools used, the file scope, and what was manually checked.
- When cloning from this template, complete `docs/template-setup.md` before the first feature PR.

## Architecture

- Keep application code in `src/`.
- Keep task reasoning artifacts in `plans/`.
- Keep repository memory in `.memory/`.
- Keep experiment and red-team evaluation rules in `docs/agent-eval-workflow.md`.
- Read environment variables only in `src/config/env.ts`.
- Use `src/observability/app-logger.ts` for structured application logging.
- Prefer `Effect` services for error-heavy or IO-heavy boundaries.
- Prefer named exports in new code.
- Prefer small modules with explicit inputs and outputs.
- Keep the non-coder operating guides in `docs/` accurate.
- Keep `AGENTS.md` aligned with this file so other tools see the same repo rules.

## Disallowed Patterns

- Do not use `throw new Error(...)` in application code.
- Do not leave empty `catch` blocks.
- Do not add `console.log(...)` in application code.
- Do not call `process.exit(...)` outside scripts.
- Do not read `process.env` outside the config boundary.
- Do not write to `process.stdout` outside the logger boundary or scripts.

## Commands

```bash
npm run typecheck
npm run lint
npm run test
npm run ast-grep
npm run docs:check
npm run docs:stamp
npm run plan:new -- 2026-03-30-first-feature
npm run task:publish -- 2026-03-30-first-feature --dry-run
npm run demo:greet -- Jaime
npm run demo:health
npm run validate
```

## Notes

- If a policy rule needs to change, update the matching file in `rules/`.
- Keep repo-level instructions here instead of repeating them in each session.
- `AGENTS.md` mirrors this contract for tools that do not read `CLAUDE.md`.
- Background-agent prompt assets live in `.agents/`.
- The non-coder workflow docs live in `docs/non-coder-workflow.md`, `docs/agent-failure-modes.md`, `docs/agent-reasoning-workflow.md`, `docs/agent-eval-workflow.md`, `docs/repository-memory.md`, and `docs/template-setup.md`.
