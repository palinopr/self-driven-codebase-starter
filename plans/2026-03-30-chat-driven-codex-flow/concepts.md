# Concepts

## Domain Concepts

- chat-first operation
  why it matters: the user interface is the Codex conversation, not the filesystem or shell
- agent-owned workflow mechanics
  why it matters: planning, validation, and publishing should be Codex responsibilities once the user asks for work
- explicit repo discipline
  why it matters: making Codex proactive should not weaken planning, evidence, or review gates

## Evaluation Concepts

- development metric:
  why it matters: docs and repo instructions should consistently describe Codex as the actor that runs plan, readiness, validation, and publish steps
- held-out evaluation:
  why it matters: validation should confirm docs drift, lint, tests, and repo health still pass after the wording changes
- stop condition:
  why it matters: the feature is done once the docs and repo contract are aligned and the branch is ready to publish again
- reward-hacking risk:
  why it matters: wording could sound more autonomous without actually telling Codex to do the steps proactively

## Concepts Out Of Scope

- full autonomous merge
  why it should not drive this task: this change is about who drives the workflow before review, not removing review or merge controls
