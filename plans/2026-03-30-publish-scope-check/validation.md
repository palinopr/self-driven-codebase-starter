# Validation

## Automated Checks

- command: `npm run test -- task-publish`
  expected signal: publish flow tests pass, including new scope-drift cases
  result: passed with 7 tests, including allowed scope, auto-allowed current task-plan files, and blocked out-of-scope changes
- command: `npm run format`
  expected signal: formatting remains clean after logic and doc updates
  result: passed; Biome rewrote 1 file and the tree stayed clean under `npm run validate`
- command: `npm run docs:stamp`
  expected signal: changed anchored docs are restamped
  result: passed; restamped the anchored workflow docs after the new scope-gate wording
- command: `npm run validate`
  expected signal: typecheck, lint, tests, ast-grep, and docs drift all pass
  result: passed with 14 tests total and a clean docs drift check
- command: `npm run demo:health`
  expected signal: repo health remains healthy
  result: passed with `status: "healthy"`, `staleAnchors: 0`, and no reported issues

## Manual Checks

- manual check: run `npm run task:publish -- 2026-03-30-publish-scope-check --dry-run` with only in-scope files changed
  expected result: the command plans branch, commit, push, and draft PR actions
  result: passed; the command planned branch, commit, push, and draft PR creation on `codex/2026-03-30-publish-scope-check`
- manual check: add one changed file outside the task plan scope and rerun the same command
  expected result: the command refuses to publish and reports the unexpected file
  result: passed using a temporary `scope-drift.tmp` file at the repo root; publish failed with `Unexpected files: scope-drift.tmp`, and the file was removed immediately after the check

## Review Focus

- highest-risk area: path matching that is too loose or too strict
- what a human should inspect: whether the allowed-scope rules are understandable from `files.md`

## Rollback Notes

Remove the scope-enforcement logic and related docs together so publish returns to the previous whole-worktree behavior.
