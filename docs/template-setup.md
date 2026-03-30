<!-- drift path="README.md" hash="3c18bc07fae2ed42" -->
<!-- drift path="package.json" hash="1d933e9d9d3cdd9a" -->
<!-- drift path="CLAUDE.md" hash="3fc225f1b0d4b277" -->
<!-- drift path="AGENTS.md" hash="ba26e4f0c090b889" -->
<!-- drift path=".github/ISSUE_TEMPLATE/ai-build-request.yml" hash="5d6f2502f89b4809" -->
<!-- drift path=".github/pull_request_template.md" hash="90eaca6568cb51b0" -->
# Template Setup

Use this repository as the starting point for a new product, not as a forever demo.

## 1. Create The New Repository

- Click `Use this template` on GitHub.
- Give the new repository the product name you actually want to ship.
- Decide whether the repository should start private or public.

## 2. Rename The Product

Before asking an agent for the first feature, update:

- `package.json`
- `README.md`
- `docs/architecture.md`

Those files should describe the real product, not the starter.

## 3. Keep The Safety Rails

Do not delete these on day one:

- `CLAUDE.md`
- `AGENTS.md`
- `.github/workflows/ci.yml`
- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/ai-build-request.yml`
- `rules/`
- `src/services/repository-health-service.ts`
- `docs/non-coder-workflow.md`
- `docs/agent-failure-modes.md`

Those files are the enforcement layer that keeps the agent useful after the first burst of velocity.

## 4. Replace The Demo Slice Intentionally

- Keep `npm run demo:health`.
- Replace `npm run demo:greet` only when you have the first real product slice.
- When you remove or rename starter code, update the tests and the drift-stamped docs in the same pull request.

## 5. Start With One Small Product Slice

Use the `AI Build Request` issue template and ask for one narrow outcome:

- one feature
- one user-visible result
- one proof path you can understand

Avoid giant prompts that mix product work, refactors, design changes, and infrastructure at the same time.

## 6. Tighten The Rules From Real Failures

Keep the starter rules, then add more only when the agent actually repeats a bad pattern. Good examples:

- missing tests
- silent failure handling
- wrong file placement
- docs that overclaim the implementation

## 7. Protect Main Before Shipping

Before you call the new repo production-ready:

- require pull requests to change `main`
- require `validate` to pass
- require conversation resolution
- keep a rollback note in every risky PR

This template is meant to make AI-assisted product work safer, not merely faster.
