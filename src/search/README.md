# Search pipeline

## Index

`scripts\build-search-index.ts` runs at build time (or with `bun run build-search-index`) which spits out `src\generated\searchIndex.json`

It loads all of the documents from below and generates the searchable index

it runs under bun, not vite, so it reads the markdown files straight off disk and imports the page list from `rulebook/pageList.ts` (not `pages.ts`, which only works inside vite). it also writes `src\generated\searchIndex.hash.ts` so the app can check whether its cached index is stale without loading the whole json. `src\generated` is gitignored, a fresh clone gets it on the first `bun run dev` or `bun run build`.

the file looks like this:

```json
{
    "version": 1,
    "hash": "sha1 of the documents array",
    "builtAt": "iso time, informational",
    "documents": [ ... ]
}
```

every document has the same shape no matter where it came from (`types.ts`):

-   `id` - unique, e.g. `rulebook:combat#cover`, `glossary:effects:burn`, `trait:defender`
-   `source` - `trait`, `art`, `item`, `creature`, `glossary` or `rulebook`
-   `title` - heading text or record name, stored as it is in the source (mostly lowercase)
-   `aliases` - extra spellings joined by spaces, only glossary records have any
-   `body` - the text a query matches against. raw, so `**bold**` and `⚀⚁⚂` stay in
-   `pageTags` - rulebook only, the frontmatter `tags` joined by spaces
-   `context` - the second line of a result row, e.g. `Rulebook > Combat` or `Item · mundane · weapon, side`
-   `to` - the route the row navigates to
-   `color` - palette name for the row's hover tint
-   `pill` - glossary only, the literal `bg-<color>` class for the pill
-   `page`, `anchor` - rulebook and glossary only, where on the page the thing lives
-   `glossary` - glossary only, `{ kind, name }` so the row can look the record up at runtime

search matches on `title`, `aliases`, `body` and `pageTags`. everything else is just stored for display. `req` and content `tags` are not searchable on purpose, they only show in `context`.

## Documents

contains the functions that transform all of the sources to be wrapped into the index.

`rulebook.ts` - one document per heading of every markdown page. strips the frontmatter, runs `extractSections` from `rulebook/sections.ts`, and any text before the first heading gets folded into the first section. `context` is the heading path (`Rulebook > Combat`), `to` is `/rulebook/<page>#<heading-slug>`. directive lines (`::effects{...}`) contribute nothing, the glossary covers those.

`glossary.ts` - one document per record of every source in `GLOSSARY_SOURCES`. `to`, `page`, `anchor` and `pill` come from the source the same way the tooltips get them, so a search row and a tooltip always point at the same spot.

`content.ts` - one document per trait, art, item and creature from the same json files `hooks/useApiClass.tsx` reads (a test checks the paths match). the `id` is the slugged name; if two records share a name the second gets `-2`, `-3`... `context` is the type plus `req` / level and stat / rarity and tags / level and types.

`palette.ts` - utility for content. `colorFor(word)` turns a class, rarity or stat word into a palette name (`fighter` -> `body`, `legendary` -> `arcana`, `nature` -> `nature`). it reads `PILL_COLOR_WORDS` from `util/textFormatting.tsx`, the same table the pills use, so the two can't disagree. unknown words get `aabase`.

`buildDocuments.ts` - glues the three together, throws if any two documents share an `id` (that one is a code bug, not content), and stamps the version, hash and build time. the hash function is passed in by the script so this file has no node imports.

## Engine

`engine.ts` wraps MiniSearch. `SEARCH_OPTIONS` is the one options object, used both to build an index and to load a serialized one, so the two can't differ. terms are lowercased, apostrophes straightened, and anything shorter than 2 characters is dropped. `title` is boosted 4, `aliases` 3, `pageTags` 2. matching is by prefix, with fuzzy matching for terms of 5 letters or more. every document field is stored, so a result is a whole `SearchDocument` plus `score` and `terms`.

`search(engine, query, limit = 50)` requires every word to match; if that finds nothing and the query has more than one word it tries again with any word. equal scores are ordered glossary, rulebook, trait, art, item, creature and then by title.

## Provider

`SearchProvider.tsx` is mounted in `RootLayout`. it starts the index build when the browser is idle after first paint (`setTimeout` 1500 ms where `requestIdleCallback` is missing), or as soon as something calls `ensure()`. the build lazy-loads `searchIndex.json` (its own chunk), builds the engine and stores the serialized engine in `sessionStorage` under `rpg-hell.searchIndex.<hash>`, removing keys for older hashes. on the next load in the same tab the stored engine is restored and the json is never fetched. a failed `sessionStorage` write is ignored. any other throw sets the status to `failed`.

`useSearch()` returns `{ status, ensure, search }`. `status` is `idle`, `building`, `ready` or `failed`, and `search` returns `[]` until it is `ready`.

## Snippets

`snippet.ts`. `snippetFor(result, maxLength = 160)` collapses whitespace in the body and takes a window that starts on a word about 40 characters before the first matched term, with `…` on each clipped end. with no term in the body (a title-only hit) it is the start of the body. `snippetHtml(snippet, terms)` returns escaped html with each matched term in `<mark>` and stat words colored. glossary terms stay plain because there is no tooltip layer around search results.

components import from `src/search` (`index.ts`) only.

## vitePlugin

`vitePlugin.ts` is registered in `vite.config.ts`. it runs the bun script when a build starts and fails the build if the script fails, so a broken index can't ship silently. in dev it runs once at startup, then watches `assets\RulebookFiles\markdown` and `assets\OfflineJsons` and reruns the script and reloads the browser when a file in either changes (debounced so one save runs it once). under vitest it only runs when `src\generated\searchIndex.hash.ts` is missing (a fresh clone), because `SearchProvider.tsx` imports that file statically, and it never watches.

it must only import `node:` modules and vite types, never anything from `src`, because vite bundles the config with esbuild.

## tests

everything in `documents/` has a test next to it. `script.test.ts` actually spawns bun on the script into a temp folder and checks the output, which is the test that proves the whole module graph loads outside vite. none of the tests read `src\generated` (`SearchProvider.test.tsx` mocks both generated files), so the suite runs on a fresh clone.
