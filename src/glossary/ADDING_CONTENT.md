# Adding game content

how to get new content from a json file in `src/assets/OfflineJsons` into the rulebook, the tooltips and search.

anything that should be listed in the rulebook, get a tooltip in effect text, and show up in search is a **glossary source**. one source file in `src/glossary/sources/` plus one line in `sources.ts` does all three. the existing sources are `effects.ts`, `definitions.ts`, `keys.ts` and `paths.ts`; copy whichever is closest.

traits, arts, items and creatures are table content and work differently, see [table content](#table-content-is-not-a-glossary-source) at the bottom.

## Which case are you in

-   **a new json file** - write a source file, register it, place its directive. start at [writing the source file](#writing-the-source-file).
-   **a new group in an existing file** (a new paths `source`, effect `category`, key `source`) - usually just a directive placement, sometimes a type update. see [a new group in an existing file](#a-new-group-in-an-existing-file).
-   **new records in an existing group** - nothing to do. edit the json and they show up everywhere.

## Writing the source file

every record has to fit `GlossaryRecord` (`sources/source.ts`):

| field     | required | notes                                                                                     |
| --------- | -------- | ----------------------------------------------------------------------------------------- |
| `name`    | yes      | lowercase, trimmed, straight apostrophes, unique within the source                        |
| `effect`  | yes      | markdown, not empty. what the rulebook bullet shows, and what search matches on           |
| `short`   | no       | shown in the tooltip instead of `effect` when it is not empty                             |
| `aliases` | no       | other spellings that should get the same tooltip (`burning` for `burn`)                   |
| `tooltip` | no       | `false` leaves the record out of effect text tooltips. it still renders and is searchable |

any other fields are free. they become filters for the directive (see below).

### json that already matches

if the json has `name` and `effect`, cast it like `effects.ts` does. the source tests validate every record, so the cast is safe.

```ts
import feats from "../../assets/OfflineJsons/feats.json";
import { generateSlug } from "../../util/slug";
import { GlossarySource, bullet, findRecord } from "./source";

export type Feat = {
    name: string;
    tier: string;
    effect: string;
    short?: string;
    aliases?: string[];
};

export const allFeats: Feat[] = feats as Feat[];

export function getFeat(name: string): Feat | undefined {
    return findRecord(allFeats, name);
}
```

### json with different field names

map it into shape instead of renaming fields in the json. `paths.ts` does this because `paths.json` has `description` and `short` but no `effect`:

```ts
export const allPaths: Path[] = pathsJson.map((p) => ({
    ...p,
    effect: p.description || p.short,
    tooltip: false,
}));
```

### the source object

```ts
export const featsSource: GlossarySource<Feat> = {
    kind: "feats",
    records: allFeats,
    page: () => "character-creation",
    anchor: (f) => `feat-${generateSlug(f.name)}`,
    label: () => "feat",
    pillColor: () => "bg-crafting",
    toLine: (f) => bullet(f.name, f.effect),
};
```

| member      | what it is for                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`      | the directive name (`::feats{…}`) and part of the search id. lowercase letters only                                                               |
| `records`   | the list. array order is display order                                                                                                            |
| `page`      | the rulebook page slug the record is placed on. a `RulebookPageSlug`, so a typo fails typecheck                                                   |
| `anchor`    | the `id` the record's bullet gets. prefix it with the kind so it can't clash with a heading or another source                                     |
| `label`     | the small text in the tooltip pill and the second line of a search row                                                                            |
| `pillColor` | a literal `bg-<color>` class. built strings are fine only for palette colors the tailwind safelist already covers (`bg-${p.color}` in `paths.ts`) |
| `toLine`    | one bullet of markdown, without the leading `-`. `bullet(name, effect)` gives the usual `**_Name_** - effect`                                     |
| `toBlock`   | optional. when a directive matches exactly one record it renders this as a block instead of a one-item list. `definitions.ts` uses it             |

### register it

```ts
// sources/sources.ts
export const GLOSSARY_SOURCES: GlossarySource[] = [
    effectsSource,
    definitionsSource,
    keysSource,
    pathsSource,
    featsSource,
];
```

order is precedence: if two sources have a record with the same name, the tooltip and the rulebook link use the first. `sources.test.ts` lists every allowed name clash, so a new one fails the test until you add it there on purpose.

the source file must not import anything that only works inside vite (`import.meta.glob`, `?raw`, react components). the search index script imports it under bun. import `RulebookPageSlug` with `import type`.

## Rendering in the rulebook

put the directive on its own line in the page's markdown file:

```md
The base game Paths are:

::paths{source="core"}

::effects{category="bane" tight}

::definitions{name="death's door"}
```

-   every attribute is an equality filter on a record field. no attributes lists every record.
-   `tight` renders the list without blank lines between bullets.
-   each bullet's `<li>` gets `anchor(record)` as its `id`, so `/rulebook/character-creation#path-fighter` scrolls to it.
-   bullets are re-parsed as markdown and stat words get colored after, so `**bold**` and `body`/`mind` coloring work like hand-written bullets.
-   a directive with an unknown name, an attribute no record has, or no matches renders `[kind: reason]` on the page and logs a warning. look for that text after adding one.

**the directive has to be on the page `page(record)` returns.** tooltip links and search rows go to `/rulebook/<page>#<anchor>`; if the record isn't placed there they scroll to nothing. only definitions are checked by a test (`rulebook/placements.test.ts`). for any other source, check every group has a placement. right now `paths.json` has `core2` paths that are not placed anywhere.

## Tooltips

nothing to do for a registered source. every record without `tooltip: false` is matched in effect text by name and by its aliases.

-   matching is case-insensitive whole words, longest first. a name ending in ` x` (`reaching x`) matches without the x.
-   the tooltip shows `short` if it isn't empty, otherwise `effect`, with any other glossary terms inside it turned into links.
-   the pill shows `label` in `pillColor`, and "Read in the rulebook" goes to `page#anchor`.

set `tooltip: false` when names are ordinary words. `paths.ts` does this because `face`, `spirits` and `fighter` show up in effect text. most of the combat actions in `definitions.json` (`attack`, `move`, `push`…) do the same.

aliases have rules that `sources.test.ts` enforces: lowercase, never a stat word (`charm`, `nature`…), never the same as any record name or another alias in any source.

tooltips only appear where `GlossaryTooltipLayer` is mounted: the trait, art and item tables and cards. not on rulebook pages. to add them to another component, render the text with `formatEffectString` inside the layer:

```tsx
import { GlossaryTooltipLayer, formatEffectString } from "../../glossary";

<GlossaryTooltipLayer>
    <p dangerouslySetInnerHTML={{ __html: formatEffectString(record.effect) }} />
</GlossaryTooltipLayer>;
```

## Search indexing

nothing to do for a registered source. `scripts/build-search-index.ts` reads `GLOSSARY_SOURCES` and `search/documents/glossary.ts` makes one document per record:

-   id `glossary:<kind>:<slugged name>`, so names only have to be unique within a source.
-   matched on `name`, `aliases` and `effect` (as plain text).
-   the row's second line is `label`, its tint comes from `pillColor`, and it links to `page#anchor` with the query highlighted.
-   `tooltip: false` does not affect search.

the dev server rebuilds the index when a file in `OfflineJsons` or the rulebook markdown changes. it does not watch `src/glossary`, so after adding or editing a source file restart `bun run dev` or run `bun run build-search-index`.

if a source's `page` is one of the table pages (`traits`, `spells`, `items`, `creatures`), add nothing: `search/navigate.ts` already leaves those links alone, because `?q=` filters the table there instead of highlighting.

## A new group in an existing file

-   **paths, new `source`** (`core3`) - add the records and place `::paths{source="core3"}` in `character_creation.md`. `pathsSource.page` is fixed to `character-creation`, so place it there or change `page`.
-   **effects, new `category`** - add it to `EFFECT_CATEGORIES` and `PILL_COLORS` in `effects.ts` (`effects.test.ts` fails on an unknown category), then place `::effects{category="…"}` in `effects.md`.
-   **keys, new `source`** - add it to `KEY_SOURCES`, `KEY_PAGES`, `KEY_ANCHOR_PREFIXES` and `PILL_COLORS` in `keys.ts`. the key lists live in their own files (`spell_key.md`, `item_key.md`) shown in a collapsed panel on a table page, so a new one needs its own file added to `NON_PAGE_FILES` in `rulebook/pages.test.ts`, a panel on its table page, and `useKeyAnchor("key-<source>-")` on that panel so tooltip links open it.
-   **definitions, new record** - set its `page` and place `::definitions{name="…"}` on that page exactly once. `placements.test.ts` checks it.

## Table content is not a glossary source

traits, arts, items and creatures are read by `hooks/useApiClass.tsx` and shown in table pages. they have no directive or tooltip; search indexes them through `search/documents/content.ts`. a new table type means:

1. an `eApiClass` value and a json import in `useApiClass.tsx`, and a table page (copy one of the four).
2. the same json imported in `scripts/build-search-index.ts` and passed in `content`, plus a branch in `search/documents/content.ts` and a `SearchSource` in `search/types.ts`.
3. its route in `TABLE_ROUTES` and its source in `CONTENT_SOURCES` in `search/navigate.ts`.

## Checking it

1. `bun run test:run`. the generic source tests run over the new records automatically.
2. open the page with the directive and look for `[kind: …]` text.
3. hover a record's name in a table's effect text (unless `tooltip: false`), and follow "Read in the rulebook".
4. search for a record's name and open the row.
