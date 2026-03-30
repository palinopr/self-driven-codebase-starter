# File Localization

## Confirmed Files

- README.md
  why: the main template entrypoint should describe chat as the primary interface
- docs/non-coder-workflow.md
  why: this is the clearest place where the operator guidance must stop sounding shell-driven
- docs/agent-reasoning-workflow.md
  why: the reasoning flow should say the agent creates and maintains the plan from chat requests
- plans/README.md
  why: plan docs should say Codex maintains these files on the user’s behalf
- CLAUDE.md
  why: the canonical repo contract should instruct Codex to run workflow commands proactively
- AGENTS.md
  why: the mirrored contract should say the same thing for other tools
- docs/template-setup.md
  why: new repos should be told early that chat is the operator surface
- plans/2026-03-30-chat-driven-codex-flow/
  why: keep the current task plan honest

## Candidate Files

- docs/agent-failure-modes.md
  why: docs drift anchors restamp when the repo contract wording changes
- .github/ISSUE_TEMPLATE/ai-build-request.yml
  why: may need one line clarifying that a chat request can be translated into this structure by Codex
- .github/pull_request_template.md
  why: may need one line clarifying the user’s role stays conversational while Codex fills the repo artifacts

## Files To Avoid

- src/
  why it should stay untouched: this is a workflow and instruction correction, not a product-code change
- scripts/
  why it should stay untouched: no command behavior needs to change for this wording correction
