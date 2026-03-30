# Repository Skills

This file captures stable working habits that agents should reuse in this repository.

## Current Stable Skills

- Start from the issue template, then create `plans/<task-id>/` before broad feature work.
- Keep diffs reviewable and prefer one scoped change per pull request.
- Use `npm run validate` as the default gate before calling work done.
- Update drift-stamped docs when code, commands, or workflow behavior changes.
- Prefer `Effect` services for IO-heavy or error-heavy boundaries.
- Keep logging inside `src/observability/app-logger.ts`.
- Add structural rules in `rules/` only after a bad pattern repeats.

## Update Rule

Only add entries that a future agent should confidently reuse.

Good entries:

- patterns visible in multiple merged changes
- habits that reviewers keep asking for
- architectural choices that affect file placement or validation

Bad entries:

- scratch notes from one task
- temporary debate points
- preferences with no evidence in the repo
