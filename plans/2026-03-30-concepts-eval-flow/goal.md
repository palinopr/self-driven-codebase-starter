# Goal

## User Outcome

Repo users should have a stronger planning workflow that makes domain concepts explicit and gives autonomous experimentation work a safer evaluation scaffold.

## Current Problem

The repo now supports staged planning, memory, and AI provenance, but it still misses two useful layers from the latest papers:

- plans do not explicitly capture the domain concepts an agent should reason with
- autonomous optimization or red-team work does not yet have a checked-in evaluation workflow that separates development metrics from held-out evaluation and reward-hacking risks

## Constraints

- keep the workflow lightweight and repo-level, not benchmark-specific
- fit the new pieces into the existing `plans/`, `.agents/`, `docs/`, and health-check scaffold
- preserve the current non-coder-friendly tone and review flow

## Non-Goals

- do not build a full experiment runner
- do not add product-specific domain concepts yet
- do not add GitHub automation beyond checked-in templates and docs

## Acceptance Evidence

- the plan templates include an explicit concepts artifact
- the repo has a documented evaluation workflow for experiments and red-teaming
- the relevant prompts, docs, and health checks require the new files
- `npm run validate` and `npm run demo:health` stay green
