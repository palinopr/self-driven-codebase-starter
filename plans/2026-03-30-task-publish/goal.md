# Goal

## User Outcome

A repo user should be able to turn a completed task plan into a draft PR workflow with one command instead of manually creating a branch, commit, push, and PR.

## Current Problem

The repository can now scaffold task plans, but it still stops at local code changes. That means the last review step is easy to forget and the PR template discipline is not consistently exercised.

## Constraints

- keep the publish flow explicit and review-oriented
- create draft PRs only, never auto-merge
- derive commit and PR metadata from the checked-in task plan
- keep a dry-run mode so users can inspect what would happen before pushing

## Non-Goals

- do not auto-fill missing task-plan content with AI text during publish
- do not publish if the task plan is still the untouched template
- do not add background automation or scheduled publishing

## Acceptance Evidence

- `npm run task:publish -- <task-id> --dry-run` shows the expected branch, commit, push, and draft PR actions
- the command refuses to publish when required plan files are missing
- the command refuses to publish when the task plan still contains template placeholders
- tests cover both successful draft generation and placeholder-plan rejection
