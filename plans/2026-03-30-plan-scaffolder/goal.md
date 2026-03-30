# Goal

## User Outcome

A repo user should be able to create a new task plan folder from `plans/_template/` with one command instead of copying files manually.

## Current Problem

The workflow now requires a plan before meaningful work, but plan creation is still manual. That adds friction right at the point where we want the new discipline to be easy to adopt.

## Constraints

- keep the command simple and local
- do not overwrite an existing task folder
- preserve the checked-in plan template structure
- fit the current TypeScript and script style used by the repo

## Non-Goals

- do not generate issue ids automatically
- do not fill plan contents with AI-generated text
- do not add network or GitHub integration

## Acceptance Evidence

- `npm run plan:new -- 2026-03-30-my-task` creates `plans/2026-03-30-my-task/`
- the new folder includes all template files
- trying to scaffold an existing folder fails safely
- tests cover both success and non-overwrite behavior
