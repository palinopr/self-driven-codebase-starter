# Concepts

## Domain Concepts

- publish boundary
  why it matters: the command should only handle branch, commit, push, and draft PR creation after implementation is already done
- plan-derived provenance
  why it matters: the PR should be grounded in the checked-in reasoning artifacts instead of ad hoc commit text
- safe failure
  why it matters: the flow should stop before GitHub actions if the plan is incomplete or still placeholder text

## Evaluation Concepts

- development metric:
  why it matters: dry-run output should show the exact Git and GitHub commands the command would execute
- held-out evaluation:
  why it matters: tests should verify that placeholder plans are rejected before any publish steps are attempted
- stop condition:
  why it matters: the feature is done once metadata generation, dry-run behavior, docs, and repo validation all pass
- reward-hacking risk:
  why it matters: the command could appear to work while publishing template placeholder text into commit and PR metadata

## Concepts Out Of Scope

- automatic merge
  why it should not drive this task: merging is a separate human review decision and should stay outside this feature
