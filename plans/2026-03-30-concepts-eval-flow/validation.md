# Validation

## Automated Checks

- command: `npm run format`
  expected signal: repo formatting is consistent after template changes
  result: passed
- command: `npm run docs:stamp`
  expected signal: all changed drift-anchored docs are restamped
  result: passed
- command: `npm run validate`
  expected signal: typecheck, lint, tests, ast-grep, and docs drift all pass
  result: passed after one fixture expectation fix in `test/repository-health-service.test.ts` (`markdownDocuments` changed from 27 to 28)
- command: `npm run demo:health`
  expected signal: the repo reports the new planning and evaluation scaffold as healthy
  result: passed with `agentPromptFiles: 8`, `anchoredDocuments: 9`, `guideDocuments: 7`, `memoryFiles: 3`, `planTemplateFiles: 7`, `status: "healthy"`

## Manual Checks

- manual check: inspect the new `plans/` template
  expected result: it includes a clear concepts artifact alongside goal, files, tasks, steps, and validation
  result: passed
- manual check: inspect the new evaluation docs and prompts
  expected result: they distinguish visible training metrics from held-out evaluation and reward-hacking risks
  result: passed

## Review Focus

- highest-risk area: updating the health-check counts and fixture expectations without missing a required file
- what a human should inspect: whether the new docs are specific enough to guide real repo work, not just describe it

## Rollback Notes

Revert the new planning and evaluation scaffold files together with the health-check changes so the repo returns to the previous simpler workflow.
