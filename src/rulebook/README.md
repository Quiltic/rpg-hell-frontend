# Rulebook documentation for Humans

this document is for explaining the rulebook functionality to humans and to be brief while doing it.
CLAUDE.md will be meandering I wouln't read it if you aren't a robot.

## frontmatter.ts

parses "frontmatter" yaml metadata blocks at the top of the RulebookFiles.

the fields are `title`, `order` and `tags`. a field with the wrong type gets dropped with a console warning. `title` and `order` have to match `RULEBOOK_PAGES` (see tests below), `tags` is free text for search.

## Generating Markdown page pipeline

`pageList.ts` - utilites for `pages.ts` and home of `RULEBOOK_PAGES` listing which includes the `slug` values used as "ids" for pages.
`pages.ts` - loads Rulebook markdown stored in `assets\RulebookFiles\markdown` and outputs raw markdown text.
`RulebookMarkdownPage.tsx` - loads a `slug` and returns a markdown page with a the nav header. It runs `MarkdownRenderer`

adding a page: make the `.md` file with a frontmatter block, add it to `RULEBOOK_PAGES` with a `file`, add it to `RulebookNav.tsx` if it should show in the nav. `main.tsx` picks up the route by itself.

### MarkdownRenderer

lives in `render/` along with everything only it uses (the files in this section and the directive files below). `sections.ts`, `frontmatter.ts`, `pages.ts` and `pageList.ts` stay up top because the search index needs them too.

`MarkdownRenderer.tsx` takes raw markdown text and turns it into the page. the steps in order:

1. `useMarkdown.tsx` runs `extractHeadings` (from `sections.ts`) over the text to get every heading and its `slug`.
2. `HeadingJumpTo.tsx` renders those headings as the "Page Sections" link list at the top. skipped when `have_header` is false.
3. `react-markdown` renders the text. plugins run in this order:
    - `remark-frontmatter` - hides the yaml block so it doesn't render as text.
    - `remark-gfm` - github flavoured markdown (tables etc).
    - `remark-directive` - turns `::name{attr="value"}` lines into directive nodes.
    - `contentDirectives.ts` - swaps those nodes for actual content. see below.
    - `remarkHighlightKeywords.ts` - wraps stat words (`body`, `mind`, `nature`...) in a coloured `<span>`. it works on the parsed tree not the raw text so it can't touch directive attributes, links or code. it has to run after the directives so their bullets get coloured too.
    - `rehype-raw` - lets those `<span>` tags through as real html.
4. every heading gets its `slug` as an `id` so `#some-heading` links work.
5. if the url has a `#hash` it scrolls there once the element exists.

## Content Directives

`::effects{category="bane"}` in a markdown file expands into a bullet list of every effect in that category. `::keys{source="item"}` does the same for item keys. `::definitions{name="..."}` drops in one definition as a block.

`contentDirectives.ts` - builds the directive list from `GLOSSARY_SOURCES`. every glossary source is a directive named by its `kind`, nothing to register here.
`remarkContentDirectives.ts` - the plugin. every attribute is an equality filter on the records (no attributes = all records). `tight` renders the list without gaps between bullets. each `<li>` gets the source's `anchor` as its `id` so links like `/rulebook/effects#effect-burn` work. if the source has `toBlock` and exactly one record matches it renders a `<div>` instead of a list, that's how definitions work.

a directive with an unknown name, an unknown attribute, or no matches renders `[name: reason]` on the page and logs a warning instead of vanishing.

directives are on for every file so any line starting with `::` is a directive. `: text` (colon space) is fine.

## sections.ts

the one parser for page structure. `extractSections` returns one entry per heading with its `path` (the parent heading texts) and a plain text `body` up to the next heading. directives, frontmatter and raw html add nothing to the body, lists and tables get flattened one item or row per line. `extractHeadings` is the same thing with the bodies dropped.

used by `MarkdownRenderer` for heading ids and the jump-to nav, and by the search index.

## tests that content edits can break

`pages.test.ts` - every file in the markdown folder is either a page or one of the three non-page files (`spell_key.md`, `item_key.md`, `character_examples.md`). frontmatter `title` matches the `RULEBOOK_PAGES` title and `order` is the page's position in that list.
`placements.test.ts` - every definition has exactly one `::definitions{name="..."}` in the file of its `page`.
`sections.test.tsx` - rendered heading ids match the section slugs and no page repeats a slug.

read the assertion message before touching code, it's usually the `.md` file.

## what are FIXTURES?

this is (temporary?) sample data for tests for tests to be run on as a baseline. it's not used for anything else.

right now it's just `combat-headings.json`, the expected headings of `combat.md`, used by `sections.test.tsx`.
