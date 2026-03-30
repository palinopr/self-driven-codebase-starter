# Concepts

## Domain Concepts

- explicit planning
  why it matters: the repo should force reasoning artifacts before broad edits
- repository memory
  why it matters: stable repo preferences should survive across tasks instead of being re-discovered every time
- publish discipline
  why it matters: validated work should turn into a draft PR instead of stopping as unreviewed local changes
- evaluation separation
  why it matters: experiment and red-team work need development metrics separated from held-out evaluation

## Evaluation Concepts

- development metric:
  why it matters: the scaffold files, commands, tests, and docs should all exist and behave correctly inside the repo
- held-out evaluation:
  why it matters: dry-run publish behavior and rejection of untouched template plans show the workflow works beyond static docs
- stop condition:
  why it matters: the rollout is done once repo validation and health are green and the repo can publish itself as a draft PR
- reward-hacking risk:
  why it matters: the system could look complete in docs while still allowing placeholder plans or local-only changes to slip through

## Concepts Out Of Scope

- product domain logic
  why it should not drive this task: this rollout is infrastructure for future product work, not the first product slice itself
