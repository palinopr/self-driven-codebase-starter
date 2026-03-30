# Concepts

## Domain Concepts

- task readiness
  why it matters: users need a fast signal for whether a plan is actionable or still template text
- shared plan analysis
  why it matters: the list command and the publish gate should agree on what “complete” means
- operator visibility
  why it matters: a non-coder should not have to inspect six markdown files to understand plan status

## Evaluation Concepts

- development metric:
  why it matters: the command should list all task plans with a clear ready or incomplete label
- held-out evaluation:
  why it matters: tests should prove the command catches missing files and placeholder content in a fixture repo
- stop condition:
  why it matters: the feature is done once the command, tests, and docs all pass validation
- reward-hacking risk:
  why it matters: the command could look useful while disagreeing with `task:publish` about what counts as a valid plan

## Concepts Out Of Scope

- publish automation
  why it should not drive this task: this feature reports plan status; it does not create branches or PRs
