# Validation

## Automated Checks

- command: `npm run test -- task-publish`
  expected signal: publish metadata and failure cases behave as expected
  result: passed with 5 tests covering metadata generation, missing-plan rejection, placeholder-plan rejection, dry-run planning, and no-changes failure
- command: `npm run format`
  expected signal: formatting remains clean after feature and docs updates
  result: passed; Biome rewrote 3 files on the first run and then stayed clean under `npm run validate`
- command: `npm run docs:stamp`
  expected signal: changed markdown anchors are restamped
  result: passed; restamped `AGENTS.md` and the updated workflow docs
- command: `npm run validate`
  expected signal: typecheck, lint, tests, ast-grep, and docs drift all pass
  result: passed with 12 tests total and a clean docs drift check
- command: `npm run demo:health`
  expected signal: repo health remains healthy after adding the publish flow
  result: passed with `status: "healthy"` and:
    - `agentPromptFiles: 8`
    - `guideDocuments: 7`
    - `memoryFiles: 3`
    - `planTemplateFiles: 7`
    - `staleAnchors: 0`

## Manual Checks

- manual check: run `npm run task:publish -- 2026-03-30-task-publish --dry-run --skip-validate`
  expected result: the command prints branch, commit, PR title, and planned Git and GitHub commands without mutating the repo
  result: passed; it planned:
    - `git switch -c codex/2026-03-30-task-publish`
    - `git add -A`
    - `git commit -m [codex] Publish A repo user should be able to turn a completed task plan in…`
    - `git push -u origin codex/2026-03-30-task-publish`
    - `gh pr create --draft --title [task] A repo user should be able to turn a completed task plan into a draft P… --body-file <tempfile>`
- manual check: leave placeholder text in a temp task plan and run the same command
  expected result: the command refuses to publish and reports that the task plan is still unfilled
  result: passed using the repo workflow itself:
    - created `plans/2026-03-30-placeholder-publish-check/` with `npm run plan:new -- 2026-03-30-placeholder-publish-check`
    - confirmed `npm run task:publish -- 2026-03-30-placeholder-publish-check --dry-run --skip-validate` failed with `Task plan ... still contains template placeholders`
    - removed the throwaway plan folder immediately after the check

## Review Focus

- highest-risk area: accepting bad plan content and publishing misleading metadata
- what a human should inspect: whether the PR body fields are concrete enough to be useful without manual cleanup

## Rollback Notes

Remove the `task:publish` command, script, reusable module, tests, and docs updates together so the repo returns to manual publishing.
