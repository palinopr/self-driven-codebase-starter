<!-- drift path=".memory/repository-skills.md" hash="c779979bedc61d30" -->
<!-- drift path=".memory/maintainer-preferences.md" hash="a343a97f268357e8" -->
<!-- drift path=".memory/patterns.json" hash="cd3408d429ab96b7" -->
<!-- drift path=".agents/onboarding.md" hash="626e3476c68a6f92" -->
# Repository Memory

This repository keeps a small checked-in memory so future agents reuse local habits instead of defaulting to generic advice.

## What Belongs In Memory

- stable file-placement patterns
- repeated maintainer review preferences
- workflow habits that have survived multiple merges
- architecture choices that are easy to forget in long sessions

## What Does Not Belong In Memory

- one-off task notes
- temporary brainstorming
- guesses that were never validated
- chat transcripts

## Current Files

- `.memory/repository-skills.md`: working habits that are already normal in this repo
- `.memory/maintainer-preferences.md`: review preferences and merge discipline
- `.memory/patterns.json`: structured patterns that tools or scripts can inspect later

## Update Rule

Only change `.memory/` when the repo has learned something durable.

Good reasons to update it:

- the same review feedback appears in several pull requests
- a file-placement habit is now consistent enough to enforce
- a new workflow became standard for features or reviews

Bad reasons:

- one session went well
- one agent preferred a style
- you want to store scratch notes
