# Concepts

## Domain Concepts

- task-plan scaffolding
  why it matters: the repo workflow depends on plan folders existing before broad edits
- safe file creation
  why it matters: the command should help users without clobbering existing work
- template fidelity
  why it matters: every new plan should match the checked-in template exactly

## Evaluation Concepts

- development metric:
  why it matters: the script should create the expected files in the expected path
- held-out evaluation:
  why it matters: tests should verify the script refuses to overwrite existing task folders
- stop condition:
  why it matters: the feature is done once the command, docs, and tests all pass validation
- reward-hacking risk:
  why it matters: the script could appear to work while skipping files or mutating template contents

## Concepts Out Of Scope

- automatic task naming
  why it should not drive this task: naming policy belongs to humans and issue workflow, not this utility
