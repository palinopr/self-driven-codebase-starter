# Goal

## User Outcome

A non-coder user should be able to describe work in chat and trust Codex to create the task plan, run readiness checks, validate, and publish without telling it which repo files or commands to use.

## Current Problem

Several docs still read as if the operator is expected to run `npm` commands or think in terms of repo files. That is the wrong interface for this setup: the user talks in Codex chat, and Codex should drive the workflow automatically.

## Constraints

- keep the workflow explicit and disciplined
- do not remove the plan, validation, or publish steps
- make the responsibility boundary clear: the user talks in chat, Codex manages the repo mechanics

## Non-Goals

- do not remove CLI commands for power users
- do not redesign the issue or PR templates unless the wording directly blocks the chat-driven model

## Acceptance Evidence

- README and workflow docs say the user can just describe work in chat
- CLAUDE.md and AGENTS.md instruct Codex to proactively run the workflow steps
- non-coder guidance no longer implies the user has to operate repo files directly
