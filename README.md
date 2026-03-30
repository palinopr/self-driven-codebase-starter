# Self-Driven Codebase Starter

This repository is a minimal TypeScript starter for building an agent-friendly codebase.

It includes:

- a checked-in repo contract in `CLAUDE.md`
- a single validation entrypoint in `npm run validate`
- TypeScript typechecking
- Biome formatting and linting
- Vitest-based tests
- `ast-grep` rules for structural policy checks
- a docs-drift check for markdown anchors
- a small `Effect`-based vertical slice with explicit services
- a repository health report that inspects the starter’s own guardrails
- structured JSON logging
- prompt assets and scheduled validation for background-agent readiness
- GitHub Actions CI for pull requests

## Commands

```bash
npm install
npm run docs:stamp
npm run validate
```

Additional commands:

```bash
npm run typecheck
npm run lint
npm run test
npm run ast-grep
npm run docs:check
npm run docs:stamp
npm run demo:greet -- Jaime
npm run demo:health
npm run format
```

## Layout

```text
.agents/              prompt assets for background agents
.github/workflows/   CI
docs/                architecture and operations docs
rules/               ast-grep policy rules
scripts/             local automation and docs-drift checks
src/                 application code
src/config/          configuration boundaries
src/observability/   structured logging boundary
src/services/        Effect-based services
test/                tests
CLAUDE.md            repo instructions for agents
sgconfig.yml         ast-grep project config
```

## Starter Policies

The initial `ast-grep` rules fail the build when app code:

- throws `new Error(...)`
- uses an empty `catch`
- logs with `console.log`
- reads `process.env` outside `src/config/env.ts`
- calls `process.exit(...)`
- writes to `process.stdout` outside the logger boundary

These are starter constraints, not a final architecture. Tighten them as patterns emerge.

## Implemented Phases

This repo now contains the full rollout described earlier:

1. repo instructions and a single validation command
2. CI and structural policy checks
3. tested vertical slices in `src/services/greeting-service.ts` and `src/services/repository-health-service.ts`
4. targeted `Effect` adoption for service composition and errors
5. structured logging through `src/observability/app-logger.ts`
6. markdown drift anchors plus `docs:check` and `docs:stamp`
7. background-agent scaffolding in `docs/background-agents.md`, `.agents/`, and nightly validation

## Docs Drift

Markdown files can declare anchors like this:

```md
&lt;!-- drift path="src/services/greeting-service.ts" hash="..." --&gt;
```

Run `npm run docs:stamp` after reviewing intentional code changes that require doc updates. `npm run docs:check` fails when an anchored file changes without the markdown being restamped.

## Repository Health

`npm run demo:health` prints a JSON report for the current repository. It tells you whether the starter still has:

- anchored markdown docs
- policy rules
- background-agent prompts
- required workflows
- stale documentation links

That makes the repo able to inspect its own engineering scaffolding, not just describe it in prose.
