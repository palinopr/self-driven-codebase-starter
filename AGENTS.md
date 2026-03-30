<!-- drift path="CLAUDE.md" hash="2a70ddf3f1df56c8" -->
# Agent Instructions

This repository keeps its canonical repo contract in `CLAUDE.md`. This file mirrors the same operating rules for tools that look for `AGENTS.md`.

## Workflow

- Use `npm run validate` before considering work complete.
- Keep changes scoped. Prefer one feature or fix per pull request.
- For feature work or any multi-file change, create or update `plans/<task-id>/goal.md`, `concepts.md`, `files.md`, `tasks.md`, `steps.md`, and `validation.md` before broad edits.
- Use `npm run plan:new -- <task-id>` to scaffold a new task plan instead of copying template files by hand.
- When a task is implemented and validated, use `npm run task:publish -- <task-id>` to create a draft PR instead of stopping at local-only changes.
- Keep `plans/<task-id>/files.md` aligned with the actual diff because `task:publish` enforces that file scope before staging.
- Add or update tests when behavior changes.
- Update docs when commands, structure, or user-visible behavior changes.
- Update `.memory/` only when a repo pattern is stable enough to reuse, not for one-off notes.
- Run `npm run docs:stamp` only after reviewing and updating anchored markdown.
- Use the issue and PR templates when creating new work or reviewing finished work.
- Keep AI-assisted pull requests explicit about the tools used, the file scope, and what was manually checked.

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

## Disallowed Patterns

- Do not use `throw new Error(...)` in application code.
- Do not leave empty `catch` blocks.
- Do not add `console.log(...)` in application code.
- Do not call `process.exit(...)` outside scripts.
- Do not read `process.env` outside the config boundary.
- Do not write to `process.stdout` outside the logger boundary or scripts.

## Template Expectations

- When starting a new product from this template, update `README.md`, `package.json`, and `docs/template-setup.md` before the first feature PR.
- Keep `npm run validate`, `npm run demo:health`, and `src/services/repository-health-service.ts` working.
- Keep `plans/`, `.memory/`, and `.agents/` intact so the repo can plan, remember, and review work explicitly.
- Replace the greeting demo only after the first real product slice exists and is tested.
- Keep `CLAUDE.md` and `AGENTS.md` aligned when instructions change.
