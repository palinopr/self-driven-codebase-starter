<!-- drift path="CLAUDE.md" hash="158cdfd474e8ff4f" -->
<!-- drift path="rules/no-throw-new-error.yml" hash="44baf5ef71e2a831" -->
<!-- drift path="src/services/repository-health-service.ts" hash="ce3fab6a038641dc" -->
# Agent Failure Modes

AI coding systems fail in repeatable ways. This repository is designed to reduce those failures, not pretend they do not exist.

## Common Problems

### Context Drift

The agent loses track of the real goal and starts solving adjacent problems.

### Memory Loss

The agent forgets earlier instructions, repo rules, or architectural boundaries in long sessions.

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

- `CLAUDE.md` keeps standing repo instructions checked in.
- `ast-grep` blocks some high-risk coding patterns.
- `docs:check` and `docs:stamp` keep Markdown tied to code.
- `demo:health` checks whether the repo still has its required safeguards.
- the PR template forces plain-English evidence, risk notes, and rollback thinking.

## The Practical Rule

Never trust AI confidence by itself.
Trust a stack of evidence:

- small scope
- green checks
- understandable demo output
- skeptical review
- a rollback path

