# Concepts

## Domain Concepts

- planned file scope
  why it matters: the task plan should define which files are expected before code gets broad
- scope drift
  why it matters: the publish step should catch extra files that silently grew outside the intended change
- safe publish gate
  why it matters: the draft PR flow should stop before staging and pushing the wrong diff

## Evaluation Concepts

- development metric:
  why it matters: dry-run should list planned commands only when all changed files are in the allowed scope
- held-out evaluation:
  why it matters: tests should prove that an unexpected changed file blocks publish
- stop condition:
  why it matters: the feature is done once scope checking, tests, docs, and validation all pass
- reward-hacking risk:
  why it matters: the command could appear safe while still staging extra files not mentioned in the plan

## Concepts Out Of Scope

- partial file staging
  why it should not drive this task: this step is about detection and blocking, not selective git add behavior
