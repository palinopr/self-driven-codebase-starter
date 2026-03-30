# Validation

## Automated Checks

- command: `npm run format`
  expected signal: formatting stays clean after the feature
  result: passed
- command: `npm run docs:stamp`
  expected signal: changed docs anchors are restamped
  result: passed
- command: `npm run validate`
  expected signal: typecheck, lint, tests, ast-grep, and docs drift pass
  result: passed after two intermediate fixes in `test/plan-scaffold.test.ts`:
    - removed invalid generic type arguments from `toMatchObject`
    - applied Biome’s final formatting for one assertion
- command: `npm run demo:health`
  expected signal: repo health remains healthy
  result: passed with `status: "healthy"` and no reported issues

## Manual Checks

- manual check: run `npm run plan:new -- 2026-03-30-example-plan` in a temp copy or fixture
  expected result: the folder is created with the full template file set
  result: passed in a temp fixture using the repo’s local `tsx` binary; the command created six files:
    - `goal.md`
    - `concepts.md`
    - `files.md`
    - `tasks.md`
    - `steps.md`
    - `validation.md`
- manual check: run the same command again
  expected result: it fails without overwriting the existing folder
  result: passed with the message `Plan directory already exists: .../plans/2026-03-30-example-plan`

## Notes From The Exercise

- The first manual CLI attempt accidentally ran from the repo root instead of the temp fixture and created a demo plan in the repo. That folder was removed immediately and the manual check was rerun in an isolated temp directory.
- A second manual attempt used `node --import tsx` from the temp directory and failed because `tsx` was not installed there. Re-running with the repo-local `node_modules/.bin/tsx` matched the real repo environment and passed.

## Review Focus

- highest-risk area: accidental overwrite or partial copy behavior
- what a human should inspect: whether the command is simple enough that non-coders will actually use it

## Rollback Notes

Remove the command, script, reusable module, and docs updates together so the repo returns to manual plan creation only.
