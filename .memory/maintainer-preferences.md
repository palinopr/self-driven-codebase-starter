# Maintainer Preferences

This file records review preferences that should influence planning and implementation.

## Current Preferences

- Prefer small, reviewable pull requests over broad "while I was here" cleanups.
- Show evidence before confidence. Green checks matter more than a persuasive summary.
- Keep tests and docs in the same pull request as behavior changes.
- Call out assumptions, risks, and rollback paths directly.
- Avoid touching extra files unless the plan or the bug actually requires it.
- Reuse existing helpers and file patterns before inventing new abstractions.

## When To Update This File

Update it when the same review preference appears across multiple pull requests or becomes a standing repo rule.
