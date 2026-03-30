# Self-Driven Product Template

This repository is a reusable TypeScript template for building products with AI agents without giving up review, tests, or repo discipline.

It includes:

- a checked-in repo contract in `CLAUDE.md`
- a cross-tool instruction file in `AGENTS.md`
- stage-aware planning artifacts in `plans/`
- concept-aware planning so tasks name the domain ideas they depend on
- repository memory files in `.memory/`
- a single validation entrypoint in `npm run validate`
- TypeScript typechecking
- Biome formatting and linting
- Vitest-based tests
- `ast-grep` rules for structural policy checks
- a docs-drift check for markdown anchors
- a small `Effect`-based vertical slice with explicit services
- a repository health report that inspects the starter’s own guardrails
- issue and pull request templates for non-coder-friendly AI workflows
- AI-usage disclosure and reasoning sections in pull requests
- evaluation guidance for autonomous experiments and red-team loops
- docs that explain agent failure modes and the safe operating model
- a template setup guide for turning this repo into a real product repo
- an agent reasoning workflow and role prompts for manager, worker, reviewer, and onboarding tasks
- structured JSON logging
- prompt assets and scheduled validation for background-agent readiness
- GitHub Actions CI for pull requests

## Use This Template

1. Click `Use this template` on GitHub.
2. Rename the product in `package.json`, `README.md`, and `docs/architecture.md`.
3. Read `docs/template-setup.md` before asking for the first feature.
4. Open one small issue with `.github/ISSUE_TEMPLATE/ai-build-request.yml`.
5. Run `npm run plan:new -- <task-id>` before broad feature work.
6. Run `npm run plans:list` if you want a quick readiness report across existing task plans.
7. Fill `concepts.md` when the task depends on domain semantics or evaluation rules, and keep `files.md` honest about the expected diff.
8. When the task is ready, run `npm run task:publish -- <task-id>` to create a branch, commit, push, and draft PR.
9. Keep `npm run validate` and `npm run demo:health` green as the repo grows.

## Commands

```bash
npm install
npm run docs:stamp
npm run plan:new -- 2026-03-30-first-feature
npm run plans:list
npm run task:publish -- 2026-03-30-first-feature --dry-run
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
npm run plan:new -- 2026-03-30-first-feature
npm run plans:list
npm run task:publish -- 2026-03-30-first-feature --dry-run
npm run demo:greet -- Jaime
npm run demo:health
npm run format
```

## Layout

```text
.agents/              prompt assets for background agents
.memory/              repository-specific patterns and maintainer preferences
.github/workflows/   CI
.github/ISSUE_TEMPLATE/
docs/                architecture and operations docs
plans/               task reasoning artifacts and templates
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
10. stage-aware reasoning templates so issues turn into explicit plans before code
11. repository-memory scaffolding plus AI provenance so the repo can remember how it prefers to evolve

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
- repository-memory files
- task-planning templates
- experiment and evaluation guidance
- policy rules
- background-agent and role prompts
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
- `docs/agent-reasoning-workflow.md`
- `docs/agent-eval-workflow.md`
- `docs/repository-memory.md`
- `AGENTS.md`
- `.github/ISSUE_TEMPLATE/ai-build-request.yml`
- `.github/pull_request_template.md`
- `plans/README.md`

Those files are the human layer of the system. They help you ask for smaller changes, review evidence instead of code confidence, and watch for common AI failure modes like context drift, memory loss, hallucinated APIs, and sloppy broad diffs.

`plans:list` gives you a local readiness report for every task folder, using the same missing-file and placeholder checks enforced by `task:publish`.

`task:publish` also checks the current diff against `plans/<task-id>/files.md` before it stages anything. If the diff has grown outside the planned file scope, the publish step stops and asks you to fix the plan or the changes first.
