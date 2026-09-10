# Rulebook / markdown pipeline

Rulebook prose lives as `.md` files in `src/assets/RulebookFiles/markdown/`. `pages.ts` loads all of them as strings at build time with `import.meta.glob(…, { query: "?raw", eager: true })`, so pages render fully on first paint. There are no `.md` imports, URL imports, or runtime fetches anywhere in `src`.

## Pages

`RULEBOOK_PAGES` in `pages.ts` is the single list of `/rulebook/*` pages: `slug`, `title`, and `file` for the pages that are markdown. `main.tsx` maps every entry with a `file` to `<RulebookMarkdownPage slug=… />` (`RulebookMarkdownPage.tsx`, the nav plus a `MarkdownRenderer`); the table pages, `full-doc`, and `character-examples/:example` remain explicit routes. `components/RulebookPages/RulebookNav.tsx` entries are typed by slug and labelled through `pageTitle`, so a nav entry cannot point at a page that does not exist. `markdownFor(slug)` returns a page's markdown; `markdownFile("spell_key.md")` returns the three files that are not pages (`spell_key.md`, `item_key.md`, `character_examples.md`). `pages.test.ts` fails if a file in the folder is neither a page file nor one of those three.

Adding a markdown page: add the file, add an entry with a `file` to `RULEBOOK_PAGES`, and add a nav entry if it should be listed. `RulebookPageSlug` is also the return type of every glossary source's `page`, so renaming a slug fails typecheck instead of producing dead tooltip links.

## Rendering

`MarkdownRenderer.tsx` → `useMarkdown.tsx` extracts headings (`headings.ts`) to build slugs/anchors and the jump-to nav (`HeadingJumpTo.tsx`), then renders via `react-markdown`. On mount, and whenever the markdown changes, it scrolls to `location.hash` after a 100 ms delay; every deep link (headings, effects, keys) relies on that. The remark chain is `remark-gfm`, `remark-directive`, `contentDirectives`, `remarkHighlightKeywords`, plus `rehype-raw`, which is required because the highlighter injects raw `<span>` tags.

**Stat colouring runs on the parsed tree, and must stay there.** `remarkHighlightKeywords.ts` visits `text` nodes and splits each stat word out into a raw `<span>`. Never colour the markdown source with a string-level regex: directive attributes, link urls, and code fences are not `text` nodes, so a source-level pass would rewrite `::effects{category="nature"}` into a paragraph that `remarkContentDirectives` never sees. The plugin also has to run _after_ `contentDirectives` so directive-generated bullets get coloured too. It reads `STAT_COLORS` and `statColorClass` from `styling/statColors.ts`, the same palette `glossary/scan.ts` uses for effect strings.

## Content directives

`remark-directive` is enabled, and `contentDirectives.ts` builds the directive table from `GLOSSARY_SOURCES`, one leaf directive per source, named by its `kind`. `effects.md` is a skeleton of headings and prose with `::effects{category="bane"}` where each list used to be; `spell_key.md` is `::keys{source="spell" tight}` and `item_key.md` is `::keys{source="item"}`. The plugin (`remarkContentDirectives.ts`) filters records by the directive's attributes (every attribute is an equality filter on a record field; none = all records; `tight` renders a tight list), joins the source's `toLine` output into a bullet list, re-parses it, and gives each `<li>` the source's `anchor` as its `id`, so `/rulebook/effects#effect-burn` deep-links and matches the tooltip links. Slugs everywhere come from `util/slug.ts`.

A directive that matches nothing, names an unknown attribute, or an unregistered name renders a visible `[name: …]` paragraph and logs a warning rather than disappearing; the `::definitions{…}` lines already present in `core_rules.md`, `combat.md`, and `effects.md` render that way until the definitions source lands. Because `remark-directive` is on for every rulebook file, a line starting with `::` or `:::` in any `.md` is parsed as a directive; `: text` (colon-space) is not.

## Dependencies

`rulebook` imports `glossary`. `pages.ts` imports nothing from `glossary`, which is what lets `glossary` import the `RulebookPageSlug` type without a cycle. `components/RulebookPages/Rulebook.md.tsx` and `headingRenderer.tsx` have no importers and are kept on purpose.
