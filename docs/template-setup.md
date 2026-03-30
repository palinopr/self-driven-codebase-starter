<!-- drift path="README.md" hash="63b1cb53942217de" -->
<!-- drift path="package.json" hash="0a88353d58ca96c0" -->
<!-- drift path="CLAUDE.md" hash="2a70ddf3f1df56c8" -->
<!-- drift path="AGENTS.md" hash="fd89d2105abe9c18" -->
<!-- drift path=".github/ISSUE_TEMPLATE/ai-build-request.yml" hash="f636073cf4435fa4" -->
<!-- drift path=".github/pull_request_template.md" hash="32ab999f896c68ad" -->
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
- `.agents/`
- `.memory/`
- `plans/`
- `.github/workflows/ci.yml`
- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/ai-build-request.yml`
- `rules/`
- `src/services/repository-health-service.ts`
- `docs/agent-reasoning-workflow.md`
- `docs/agent-eval-workflow.md`
- `docs/repository-memory.md`
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

## 6. Make The Agent Plan Before It Codes

- Run `npm run plan:new -- <task-id>`.
- Fill the goal, concepts, file scope, tasks, steps, and validation files before broad edits.
- Keep the plan path in the pull request so reviewers can compare intent against the diff.
- Use `npm run task:publish -- <task-id>` when the task is ready to become a draft PR.

The plan is where you catch over-prediction before it becomes a messy patch.

## 7. Teach The Repo Its Own Habits

- Keep `.memory/` repo-specific.
- Add a pattern only after it survives multiple merges or repeated review feedback.
- Store maintainer preferences and file-placement habits there, not in ad-hoc chat history.

This keeps the next agent from relearning the same lessons from scratch.

## 8. Add Evaluation Discipline For Autonomous Loops

- Keep development metrics separate from held-out evaluation.
- Write stop conditions for experiment loops.
- Record possible reward-hacking paths before trusting a strong metric.
- Use `docs/agent-eval-workflow.md` for experiment-heavy or red-team work.

This matters once agents are optimizing against metrics instead of just implementing product changes.

## 9. Tighten The Rules From Real Failures

Keep the starter rules, then add more only when the agent actually repeats a bad pattern. Good examples:

- missing tests
- silent failure handling
- wrong file placement
- docs that overclaim the implementation

## 10. Protect Main Before Shipping

Before you call the new repo production-ready:

- require pull requests to change `main`
- require `validate` to pass
- require conversation resolution
- require AI usage disclosure in pull requests
- keep a rollback note in every risky PR

This template is meant to make AI-assisted product work safer, not merely faster.
