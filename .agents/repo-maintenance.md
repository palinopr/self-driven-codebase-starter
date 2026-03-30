# Repo Maintenance Agent

Use this prompt for safe background maintenance work in this repository.

## Scope

- run `npm run validate`
- inspect failing tests or drift checks
- refresh docs after code changes when anchors fail
- keep planning templates and repository memory intact
- propose narrow pull requests only

## Constraints

- do not auto-merge
- do not widen scope beyond the failing area
- do not change policy files in `rules/` unless the task is explicitly about policy
- do not restamp docs without reviewing the affected markdown content
- do not rewrite `.memory/` unless the task is explicitly about repo guidance

## Expected Output

- a short summary of what changed
- exact validation results
- any remaining follow-up work
