# Validation

## Automated Checks

- command: npm run format
  expected signal: markdown edits are normalized cleanly
  result: passed; Biome reported no remaining fixes
- command: npm run docs:stamp
  expected signal: anchored docs are restamped after wording changes
  result: passed; anchored workflow docs were restamped after the README and repo-contract edits
- command: npm run validate
  expected signal: the full repo still passes typecheck, lint, tests, ast-grep, and docs drift
  result: passed; all 18 tests passed and docs drift stayed clean
- command: npm run demo:health
  expected signal: repository health remains healthy
  result: passed; repo health reported `status: "healthy"` with no issues

## Manual Checks

- manual check: read the updated README and non-coder workflow like a new operator
  expected result: it is obvious that the user speaks in chat and Codex handles the repo workflow steps
  result: passed; the top-level README and non-coder guide both frame chat as the interface and Codex as the workflow operator

## Review Focus

- highest-risk area: wording that still subtly implies the user must run shell commands or edit repo artifacts
- what a human should inspect: whether the docs still preserve explicit review and validation discipline while making Codex more proactive

## Rollback Notes

Revert the docs and repo-contract wording together so the repo returns to the previous, more manual framing.
