# Validation

## Automated Checks

- command: `npm run test -- task-plan`
  expected signal: shared plan analysis and listing behavior pass in fixtures
  result: passed; `test/task-plan.test.ts` reported 4 passing tests
- command: `npm run format`
  expected signal: formatting remains clean after code and doc changes
  result: passed; Biome rewrote 2 files and then reported no remaining fixes
- command: `npm run docs:stamp`
  expected signal: changed anchored docs are restamped
  result: passed twice; the second stamp was needed after a late `src/lib/task-publish.ts` type fix
- command: `npm run validate`
  expected signal: full repo validation passes
  result: passed after fixing one readonly-array type mismatch and restamping docs anchors
- command: `npm run demo:health`
  expected signal: repo health remains healthy
  result: passed; repo health reported `status: "healthy"`
- command: `npm run task:publish -- 2026-03-30-first-real-feature --dry-run`
  expected signal: publish preview succeeds with no scope drift
  result: passed after updating `files.md` to include mirrored instruction files and drift-restamped docs

## Manual Checks

- manual check: run `npm run plans:list`
  expected result: the command shows ready and incomplete task plans in the current repo
  result: passed; the repo listed six task plans and marked them all `READY`, including `2026-03-30-first-real-feature`

## Review Focus

- highest-risk area: mismatch between `plans:list` readiness and `task:publish` readiness
- what a human should inspect: whether the terminal output is useful without being noisy

## Notes

- The first `task:publish --dry-run` surfaced honest scope drift in `files.md` rather than a code defect. The plan was updated to include `CLAUDE.md`, `AGENTS.md`, and the docs files restamped by drift anchors.
- Shared readiness now lives in `src/lib/task-plan.ts`, and `src/lib/task-publish.ts` imports that analysis instead of keeping a second copy of the missing-file and placeholder rules.

## Rollback Notes

Remove the new CLI command, shared task-plan analysis module, tests, and docs updates together so the repo returns to manual per-folder inspection only.
