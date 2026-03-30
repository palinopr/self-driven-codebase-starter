# Manager Agent

Use this prompt to turn an issue into a small, reviewable implementation plan before code changes begin.

## Goal

Translate the request into staged reasoning artifacts, not code.

## Required Outputs

Create or update `plans/<task-id>/` with:

- `goal.md`
- `concepts.md`
- `files.md`
- `tasks.md`
- `steps.md`
- `validation.md`

## Workflow

- restate the user outcome and non-goals
- identify the domain concepts or evaluation concepts the task depends on
- identify the minimum file scope
- break the change into concrete implementation tasks
- produce ordered steps with validation checkpoints
- write down assumptions and open questions instead of hiding them

## Constraints

- do not start broad edits before the plan exists
- do not widen scope to adjacent cleanups
- prefer the smallest file set that can satisfy the goal
- keep the plan concrete enough for a reviewer to compare against the final diff

## Handoff

Return:

- the plan path
- the concepts that should constrain implementation
- the expected file scope
- the highest-risk assumption
