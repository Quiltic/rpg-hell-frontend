# Glossary

`src/glossary/` owns the game vocabulary: what the terms are, how they are recognised in effect text, and how they get tooltips. Outside the folder, import from the `src/glossary` index only.

## Sources

`sources/source.ts` defines the record shape (`{name, effect, short?, extra?, aliases?}`) and the `GlossarySource<T>` contract: `kind` (also the directive name), `records`, `page(record)` (a `RulebookPageSlug`), `anchor(record)` (the DOM id in the rulebook), `label`, `pillColor`, `toLine` (one bullet of markdown), and optional `toBlock` (the record on its own as markdown blocks, used when a directive matches one record). Three sources exist:

-   `sources/effects.ts`: `effects.json`, `{name, category, effect, …}`, `category` one of `character-state | elemental-bane | bane | boon`. Exports `allEffects`, `getEffect`, `effectsInCategory`, `effectsSource`. Every record lives on the `effects` page under `effect-<slug>`.
-   `sources/keys.ts`: `keys.json`, `{name, source, effect, …}`, `source` one of `spell | item`. Exports `allKeys`, `getKey` (scoped to a source on purpose), `keysFor`, `KEY_ANCHOR_PREFIXES`, `keysSource`. Spell keys live on the `spells` page, item keys on `items`, under `key-<source>-<slug>`.
-   `sources/definitions.ts`: `definitions.json`, `{name, page, effect, short, …}`, `page` a `RulebookPageSlug`. Exports `allDefinitions`, `getDefinition`, `definitionsSource`. Each record is placed by hand with one `::definitions{name="…"}` on its `page` (checked by `rulebook/placements.test.ts`), under `definition-<slug>`. `short` is always present; empty means the tooltip shows `effect`.

Record rules, enforced by `sources/sources.test.ts` for every registered source: names lowercase, unique within the source, straight apostrophes; array order is display order. Keys are per-table vocabulary, so the item `glow` and the bane `glow` are different records. Focus and Follower are deliberately in both `keys.json` and `effects.json`; `keys.test.ts` fails if the copies drift.

`sources/sources.ts` is the registry, `GLOSSARY_SOURCES`. Order is precedence: when two sources hold the same name, the first wins, and `sources.test.ts` asserts the exact list of collisions so a new one is a deliberate choice. Adding a source means one file in `sources/` and one entry in the registry. That alone registers its `::kind{…}` directive in the rulebook, adds its names to the keyword scanner, and runs the generic source test over its data.

## Scanning and formatting

`scan.ts` runs one regex over a plain effect string: glossary names and aliases (longest first, first occurrence per term) plus the stat words, so a term is never coloured or linked inside markup it just wrote. A `ScanEmit` decides what each match becomes. `spanEmit` produces `<span class="kw" data-kw="name">` for terms and `text-<stat>-700` spans for stat words; `formatEffectString` (`format.ts`) is `scanText` with that emitter, memoised, and is what the tables and cards pass to `innerHTML`. Aliases (`aliases` on a record) are extra spellings that resolve to the record, such as inflections; a name ending in ` x` is matched without the `x`. A glossary alias must never equal a stat word; `sources.test.ts` checks.

## Tooltips

Anything that renders `formatEffectString` output is wrapped in `<GlossaryTooltipLayer>` (`components/GlossaryTooltipLayer.tsx`). The layer listens for pointer and focus events on `.kw` elements, resolves `data-kw` through `resolveTerm` (`resolve.ts`, first source in registry order), and mounts one `GlossaryTooltip` (floating-ui, portalled). The tooltip body is `definitionHtml`: `short` when non-empty, otherwise `effect`, scanned again with an emitter that turns nested terms into links, then rendered through react-markdown. "Read in the rulebook" goes to `rulebookHref`, which is `/rulebook/<page>#<anchor>` from the source's `page` and `anchor`. Each source's `pillColor` returns a literal `bg-<color>` class for the tooltip pill so the class survives the Tailwind build (`sources.test.ts` asserts the shape).

Tooltips are mounted only in the three tables and three card views, on purpose. There is no site-wide layer.

`useKeyAnchor.tsx` exists because the spell and item key lists sit inside a collapsed `Disclosure` on the table pages. It returns `defaultOpen` and a `remountKey` for a hash matching the prefix, so `/rulebook/items#key-item-on-hit` opens the panel; scrolling is done by `rulebook/MarkdownRenderer.tsx`.

## Dependencies

`glossary` imports `util` and `styling`, and only the `RulebookPageSlug` type from `rulebook/pages.ts`. Nothing else from `rulebook` may be imported here; `rulebook` imports `glossary`, not the other way round.
