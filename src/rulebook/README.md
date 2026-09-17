# Rulebook documentation for Humans

this document is for explaining the rulebook functionality to humans and to be brief while doing it.
CLAUDE.md will be meandering I wouln't read it if you aren't a robot.

it's also incomplete

## frontmatter.ts

parses "frontmatter" yaml metadata blocks at the top of the RulebookFiles.

## Generating Markdown page pipeline

`pageList.ts` - utilites for `pages.ts` and home of `RULEBOOK_PAGES` listing which includes the `slug` values used as "ids" for pages.
`pages.ts` - loads Rulebook markdown stored in `assets\RulebookFiles\markdown` and outputs raw markdown text.
`RulebookMarkdownPage.tsx` - loads a `slug` and returns a markdown page with a the nav header.

## FIXTURES

this is (temporary?) sample data for tests for tests to be run on as a baseline. it's not used for anything else.
