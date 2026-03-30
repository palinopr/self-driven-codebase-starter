# Self-Driven Product Template

This repository is a reusable TypeScript template for building products with AI agents without giving up review, tests, or repo discipline.

It includes:

- a checked-in repo contract in `CLAUDE.md`
- a cross-tool instruction file in `AGENTS.md`
- a single validation entrypoint in `npm run validate`
- TypeScript typechecking
- Biome formatting and linting
- Vitest-based tests
- `ast-grep` rules for structural policy checks
- a docs-drift check for markdown anchors
- a small `Effect`-based vertical slice with explicit services
- a repository health report that inspects the starter’s own guardrails
- issue and pull request templates for non-coder-friendly AI workflows
- docs that explain agent failure modes and the safe operating model
- a template setup guide for turning this repo into a real product repo
- structured JSON logging
- prompt assets and scheduled validation for background-agent readiness
- GitHub Actions CI for pull requests

## Use This Template

1. Click `Use this template` on GitHub.
2. Rename the product in `package.json`, `README.md`, and `docs/architecture.md`.
3. Read `docs/template-setup.md` before asking for the first feature.
4. Open one small issue with `.github/ISSUE_TEMPLATE/ai-build-request.yml`.
5. Keep `npm run validate` and `npm run demo:health` green as the repo grows.

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
.github/ISSUE_TEMPLATE/
docs/                architecture and operations docs
rules/               ast-grep policy rules
scripts/             local automation and docs-drift checks
src/                 application code
src/config/          configuration boundaries
src/observability/   structured logging boundary
src/services/        Effect-based services
test/                tests
AGENTS.md            cross-tool agent instructions
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

This repo now contains the full template rollout described earlier:

1. repo instructions and a single validation command
2. CI and structural policy checks
3. tested vertical slices in `src/services/greeting-service.ts` and `src/services/repository-health-service.ts`
4. targeted `Effect` adoption for service composition and errors
5. structured logging through `src/observability/app-logger.ts`
6. markdown drift anchors plus `docs:check` and `docs:stamp`
7. background-agent scaffolding in `docs/background-agents.md`, `.agents/`, and nightly validation
8. non-coder operating guides plus issue and PR templates for safer AI-assisted shipping
9. a reusable setup guide so future projects inherit the same guardrails on day one

## Docs Drift

Markdown files can declare anchors like this:

```md
&lt;!-- drift path="src/services/greeting-service.ts" hash="..." --&gt;
```

Run `npm run docs:stamp` after reviewing intentional code changes that require doc updates. `npm run docs:check` fails when an anchored file changes without the markdown being restamped.

## Repository Health

`npm run demo:health` prints a JSON report for the current repository. It tells you whether the template still has:

- anchored Markdown docs
- repo instruction files
- policy rules
- background-agent prompts
- non-coder operating guides
- issue and pull request templates
- required workflows
- stale docs-drift anchors

That makes the repo able to inspect its own engineering scaffolding, not just describe it in prose.

## If You Do Not Code Much

Start with these files:

- `docs/template-setup.md`
- `docs/non-coder-workflow.md`
- `docs/agent-failure-modes.md`
- `AGENTS.md`
- `.github/ISSUE_TEMPLATE/ai-build-request.yml`
- `.github/pull_request_template.md`

Those files are the human layer of the system. They help you ask for smaller changes, review evidence instead of code confidence, and watch for common AI failure modes like context drift, memory loss, hallucinated APIs, and sloppy broad diffs.
