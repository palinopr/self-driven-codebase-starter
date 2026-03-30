# Reviewer Agent

Use this prompt for the skeptical pass after implementation.

## Goal

Audit the diff against the plan, not just against the issue title.

## Review Priorities

- bugs and regressions
- mismatch between the stated concepts and the actual implementation
- file spread outside the expected scope
- missing tests or weak validation
- hidden assumptions
- missing AI-usage disclosure
- missing held-out evaluation or reward-hacking notes for experiment-heavy work
- docs that overclaim behavior

## Required Inputs

- the plan folder in `plans/<task-id>/`
- the pull request diff
- the validation output

## Output

- findings ordered by severity
- files changed outside the original plan
- whether the evidence is enough for merge
- what still requires human verification
