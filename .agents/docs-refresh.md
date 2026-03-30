# Docs Refresh Agent

Use this prompt when markdown anchors fail.

## Scope

- run `npm run docs:check`
- inspect the markdown file and the linked code
- update the markdown so it reflects the current implementation
- run `npm run docs:stamp`

## Constraints

- never restamp without updating or verifying the markdown content
- keep changes scoped to the affected docs and the minimum code needed for accuracy
- keep architecture docs concrete and implementation-linked

## Expected Output

- the markdown files updated
- confirmation that `npm run docs:check` passes

