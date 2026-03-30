# Goal

## User Outcome

A repo user should be warned by the publish step when the current diff no longer matches the file scope written in `plans/<task-id>/files.md`.

## Current Problem

`task:publish` currently stages the whole working tree as one unit. That means the plan can say one thing in `files.md` while the actual diff contains extra files, and the publish step will still create a branch, commit, and draft PR.

## Constraints

- keep the scope check lightweight and deterministic
- compare against the checked-in task plan instead of ad hoc user prompts
- preserve the current dry-run and publish flow
- avoid false positives for the current task plan folder itself

## Non-Goals

- do not implement partial staging yet
- do not parse arbitrary natural-language scope descriptions
- do not auto-rewrite `files.md` when drift is detected

## Acceptance Evidence

- `task:publish` refuses to proceed when changed files fall outside `Confirmed Files` and `Candidate Files`
- the current task plan folder is automatically allowed
- tests cover in-scope and out-of-scope diffs
- docs explain that publish now enforces file scope from `files.md`
