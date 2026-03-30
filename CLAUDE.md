# Repository Instructions

## Workflow

- Use `npm run validate` before considering work complete.
- Keep changes scoped. Prefer one feature or fix per pull request.
- Add or update tests when behavior changes.
- Update docs when commands, structure, or user-visible behavior changes.
- Run `npm run docs:stamp` only after reviewing and updating anchored markdown.

## Architecture

- Keep application code in `src/`.
- Read environment variables only in `src/config/env.ts`.
- Use `src/observability/app-logger.ts` for structured application logging.
- Prefer `Effect` services for error-heavy or IO-heavy boundaries.
- Prefer named exports in new code.
- Prefer small modules with explicit inputs and outputs.

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
npm run demo:greet -- Jaime
npm run demo:health
npm run validate
```

## Notes

- If a policy rule needs to change, update the matching file in `rules/`.
- Keep repo-level instructions here instead of repeating them in each session.
- Background-agent prompt assets live in `.agents/`.
