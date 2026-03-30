# Validation

## Automated Checks

- command: `npm run format`
  expected signal: formatting is clean across the updated repo scaffold
  result: passed during repo rollout work
- command: `npm run docs:check`
  expected signal: reviewed and restamped docs match the current code
  result: passed through `npm run validate`
- command: `npm run validate`
  expected signal: typecheck, lint, tests, ast-grep, and docs drift all pass
  result: passed before publish
- command: `npm run demo:health`
  expected signal: repo health stays healthy after the full rollout
  result: passed with `status: "healthy"`

## Prep Step

- command: `npm run docs:stamp`
  expected signal: changed anchored docs are restamped only after review
  result: used as a prep step before `npm run docs:check`

## Manual Checks

- manual check: run `npm run plan:new -- 2026-03-30-placeholder-publish-check`
  expected result: a fresh task plan is scaffolded from the template
  result: passed; the command created `plans/2026-03-30-placeholder-publish-check/` with six files
- manual check: run `npm run task:publish -- 2026-03-30-placeholder-publish-check --dry-run --skip-validate`
  expected result: the command refuses to publish the untouched template plan
  result: passed; publish failed with `Task plan ... still contains template placeholders`
- manual check: run `npm run task:publish -- 2026-03-30-task-publish --dry-run --skip-validate`
  expected result: the command prints branch, commit, push, and draft PR steps with clean metadata
  result: passed; the command printed branch, commit, push, and draft PR actions for `codex/2026-03-30-task-publish`

## Review Focus

- highest-risk area: the publish command still stages the current working tree as one unit
- what a human should inspect: whether the repo contract and docs all describe the same workflow

## Rollback Notes

Revert the scaffold additions together: prompts, memory, plans, docs, CLI commands, and health-check updates, so the starter returns to its earlier minimal state.
