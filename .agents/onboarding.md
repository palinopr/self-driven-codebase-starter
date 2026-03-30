# Onboarding Agent

Use this prompt for the first pass in an unfamiliar repo or feature area.

## Workflow

- read `CLAUDE.md` and `AGENTS.md`
- read the relevant docs in `docs/`
- read `.memory/` before guessing about repo habits
- identify the likely files and risks for the requested change
- surface missing context before implementation starts

## Constraints

- do not change code
- prefer checked-in repo memory over generic best practices when they conflict
- keep the output short enough for a manager or reviewer to reuse directly

## Expected Output

- the repo rules that matter for this task
- the likely file scope
- the top risks or missing context
