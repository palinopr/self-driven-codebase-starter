# Architecture

<!-- drift path="src/services/greeting-service.ts" hash="f360d403ac19991d" -->
<!-- drift path="src/observability/app-logger.ts" hash="22c93b724bbaa660" -->

This repository uses a small, explicit vertical slice to demonstrate an agent-friendly layout.

## Service Boundary

`src/services/greeting-service.ts` owns greeting behavior. It uses `Effect` to model success and failure explicitly, and it exposes the functionality through a tagged service plus a live layer.

The service:

- trims and validates user input
- returns a tagged error for invalid names
- logs both accepted and rejected requests
- keeps runtime wiring outside business logic

## Observability Boundary

`src/observability/app-logger.ts` owns application logging. Application code does not write directly to `stdout`; it goes through the logger service instead.

The logger:

- emits one JSON object per line
- includes a timestamp, level, event name, and contextual fields
- can be swapped for a noop layer in tests

