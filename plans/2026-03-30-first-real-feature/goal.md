# Goal

## User Outcome

A repo user should be able to run one command and see which task plans are ready to implement or publish and which ones are still incomplete.

## Current Problem

The repo now has a full planning workflow, but there is no simple overview of task readiness. A non-coder or a new agent must open each plan folder manually to figure out whether it is still template text or actually ready.

## Constraints

- keep the output easy to scan from the terminal
- reuse the same readiness rules already enforced by `task:publish`
- do not require GitHub or network access
- keep the command safe to run at any time on the local repo

## Non-Goals

- do not mutate task plans
- do not auto-fill missing plan content
- do not add a web UI or dashboard

## Acceptance Evidence

- `npm run plans:list` prints a summary for each task plan
- ready plans and incomplete plans are clearly distinguished
- the command explains missing files or placeholder content for incomplete plans
- tests cover mixed ready and incomplete task plans
