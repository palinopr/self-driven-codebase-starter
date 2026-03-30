# Architecture

<!-- drift path="src/services/greeting-service.ts" hash="f360d403ac19991d" -->
<!-- drift path="src/services/repository-health-service.ts" hash="825aff477095fefa" -->
<!-- drift path="src/observability/app-logger.ts" hash="22c93b724bbaa660" -->
<!-- drift path="src/lib/docs-drift.ts" hash="a72d2e1a2804664b" -->
<!-- drift path="src/lib/plan-scaffold.ts" hash="aa6b5dc294efb630" -->
<!-- drift path="src/lib/task-publish.ts" hash="1b0c3da75c0e68c4" -->

This repository uses a small, explicit vertical slice to demonstrate an agent-friendly layout.

## Service Boundary

`src/services/greeting-service.ts` owns greeting behavior. It uses `Effect` to model success and failure explicitly, and it exposes the functionality through a tagged service plus a live layer.

The service:

- trims and validates user input
- returns a tagged error for invalid names
- logs both accepted and rejected requests
- keeps runtime wiring outside business logic

## Repository Health Boundary

`src/services/repository-health-service.ts` inspects the starter repository itself.
It turns the repo’s engineering scaffolding into a typed report so humans or agents can quickly answer:

- are the required workflows present
- are the background-agent and role prompts present
- does the repo still have planning templates in `plans/`
- does the repo still have repository memory in `.memory/`
- do markdown docs still match the code they describe
- does the repo still have structural policy rules

That makes this starter able to verify its own guardrails instead of relying only on documentation.

## Observability Boundary

`src/observability/app-logger.ts` owns application logging. Application code does not write directly to `stdout`; it goes through the logger service instead.

The logger:

- emits one JSON object per line
- includes a timestamp, level, event name, and contextual fields
- can be swapped for a noop layer in tests

## Plan Scaffold Boundary

`src/lib/plan-scaffold.ts` owns the logic for creating a new task-plan folder from `plans/_template/`.

The module:

- validates the task id before writing files
- copies the checked-in template exactly
- refuses to overwrite an existing task folder
- keeps the CLI wrapper in `scripts/` thin

## Task Publish Boundary

`src/lib/task-publish.ts` owns the logic for turning a completed task plan into a draft-PR-ready Git workflow.

The module:

- checks that the task plan exists and is complete
- derives branch, commit, and PR metadata from the plan files
- runs validation before publish unless explicitly skipped
- supports a dry-run mode so users can preview branch, commit, push, and PR actions
