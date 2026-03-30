<!-- drift path="CLAUDE.md" hash="9815be5050319c72" -->
<!-- drift path="rules/no-throw-new-error.yml" hash="44baf5ef71e2a831" -->
<!-- drift path="src/services/repository-health-service.ts" hash="825aff477095fefa" -->
# Agent Failure Modes

AI coding systems fail in repeatable ways. This repository is designed to reduce those failures, not pretend they do not exist.

## Common Problems

### Context Drift

The agent loses track of the real goal and starts solving adjacent problems.

### Memory Loss

The agent forgets earlier instructions, repo rules, or architectural boundaries in long sessions.

### Over-Prediction

The agent touches more files and more concepts than the request actually needs.

### Reward Hacking

The agent improves the visible metric while quietly bypassing the intended evaluation or budget.

### Hallucinated APIs

The agent invents functions, library behavior, or workflows that sound plausible but do not exist.

### Sloppy Coding

The agent writes code that is syntactically valid but structurally weak:

- silent failures
- broad changes
- poor naming
- missing tests
- hidden assumptions

### Documentation Overclaim

The agent updates docs to sound complete even when the implementation is narrower than the text.

## How This Repo Counters Those Problems

- `CLAUDE.md` and `AGENTS.md` keep standing repo instructions checked in.
- `plans/` forces issue understanding, concepts, file localization, implementation tasks, step decomposition, and validation to be written down.
- `ast-grep` blocks some high-risk coding patterns.
- `docs:check` and `docs:stamp` keep Markdown tied to code.
- `.memory/` records stable repo habits so the agent reuses local patterns instead of generic ones.
- `docs/agent-eval-workflow.md` separates visible optimization from held-out evaluation for experiment-heavy work.
- `demo:health` checks whether the repo still has its required safeguards.
- the PR template forces plain-English evidence, AI disclosure, risk notes, and rollback thinking.

## The Practical Rule

Never trust AI confidence by itself.
Trust a stack of evidence:

- small scope
- green checks
- understandable demo output
- skeptical review
- a rollback path
