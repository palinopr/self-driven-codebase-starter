<!-- drift path="CLAUDE.md" hash="3fc225f1b0d4b277" -->
# Agent Instructions

This repository keeps its canonical repo contract in `CLAUDE.md`. This file mirrors the same operating rules for tools that look for `AGENTS.md`.

## Workflow

- Use `npm run validate` before considering work complete.
- Keep changes scoped. Prefer one feature or fix per pull request.
- Add or update tests when behavior changes.
- Update docs when commands, structure, or user-visible behavior changes.
- Run `npm run docs:stamp` only after reviewing and updating anchored markdown.
- Use the issue and PR templates when creating new work or reviewing finished work.

## Architecture

- Keep application code in `src/`.
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
- Replace the greeting demo only after the first real product slice exists and is tested.
- Keep `CLAUDE.md` and `AGENTS.md` aligned when instructions change.
