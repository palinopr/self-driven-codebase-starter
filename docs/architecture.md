# Architecture

<!-- drift path="src/services/greeting-service.ts" hash="f360d403ac19991d" -->
<!-- drift path="src/services/repository-health-service.ts" hash="ce3fab6a038641dc" -->
<!-- drift path="src/observability/app-logger.ts" hash="22c93b724bbaa660" -->
<!-- drift path="src/lib/docs-drift.ts" hash="a72d2e1a2804664b" -->

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
- are the background-agent prompt assets present
- do markdown docs still match the code they describe
- does the repo still have structural policy rules

That makes this starter able to verify its own guardrails instead of relying only on documentation.

## Observability Boundary

`src/observability/app-logger.ts` owns application logging. Application code does not write directly to `stdout`; it goes through the logger service instead.

The logger:

- emits one JSON object per line
- includes a timestamp, level, event name, and contextual fields
- can be swapped for a noop layer in tests
