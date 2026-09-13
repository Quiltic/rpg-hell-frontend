# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **bun** (see `bun.lockb`, `.vscode/launch.json`, and the deploy workflow).

```bash
bun install
bun run dev          # vite dev server -> http://localhost:5173/rpg-hell-frontend
bun run build        # vite build -> dist/  (does NOT typecheck)
bun run lint         # eslint, --max-warnings 0
bun run preview      # serve the production build
bunx tsc --noEmit    # typecheck (no script for this; build skips it)
bun run generate-client  # regenerate src/client from openapi.json
```

### Tests (vitest)

```bash
bun run test                     # watch mode
bun run test:run                 # single pass (CI style)
bunx vitest run src/util/textFormatting.test.ts   # one file
bunx vitest run -t "wraps stat words"             # one test by name
```

Config lives in the `test` block of `vite.config.ts` (no separate `vitest.config.ts`): jsdom environment, `globals: true`, `src/test/setup.ts` as setup, and `src/**/*.{test,spec}.{ts,tsx}` as the include pattern. `src/test/setup.ts` registers the jest-dom matchers and calls `cleanup()` after each test; `src/test/vitest.d.ts` supplies the matcher types.

Two dependency quirks to leave alone:

-   **vitest is pinned to 3.x on purpose.** vitest 5 requires vite >= 6.4 and this repo is on vite 5, so installing vitest 5 fails at startup with `Package subpath './module-runner' is not defined`. Bump vite first if you want a newer vitest.
-   **Do not import `@testing-library/jest-dom/vitest`.** bun installs jest-dom's optional vitest peer as a nested copy, so that entry point resolves the wrong vitest and its type augmentation targets the wrong module. `src/test/setup.ts` calls `expect.extend(matchers)` and `src/test/vitest.d.ts` re-declares the augmentation against the root vitest instead.

Tests sit next to the file they cover. The JSON content files are validated by tests too (`glossary/sources/*.test.ts`, `rulebook/pages.test.ts`), so a content edit can fail the suite; read the assertion message before touching code. One failure is currently expected: `glossary/sources/keys.test.ts` reports that the Follower text differs between `keys.json` and `effects.json`. That is a content decision, not a code bug.

`bunx tsc --noEmit` currently reports ~283 pre-existing errors across the app (mostly unused locals and loose `any`s), so it is only useful for checking whether _your_ files are clean, not as a pass/fail gate. Tests are not part of the deploy workflow (`.github/workflows/deploy.yml` runs install and build only).

### Pre-commit hook (husky + lint-staged)

`.husky/pre-commit` runs `bunx lint-staged`, which runs `prettier --write` over staged files and re-stages the result. Config is the top-level `"lint-staged"` key in `package.json` — it must stay top-level, not nested inside `"scripts"`, or nothing reads it. The hook is installed by the `prepare` script on `bun install`.

Two things it deliberately does _not_ do:

-   **No eslint.** The repo has ~279 pre-existing eslint errors across a third of its files, so a blocking `eslint --fix` would reject most commits. Run `bun run lint` manually; add eslint to the hook once that backlog is cleared.
-   **No tests.** `bun run test` is vitest in watch mode and would hang the commit. Use `bun run test:run` if you ever want tests in a hook.

`.prettierignore` excludes `src/client` (regenerated from `openapi.json`) and `src/assets/OfflineJsons` (hand-maintained as one compact object per line; prettier would expand each entry to ~7 lines and make the files unreadable to edit by hand).

Note that `.prettierrc` must **not** set a top-level `"parser"`. It previously pinned `"typescript"`, which made prettier try to parse `.json`/`.css`/`.md` as TypeScript and fail with a SyntaxError. Prettier infers the parser from the file extension.

Deploy is automatic: pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages (https://quiltic.github.io/rpg-hell-frontend/). `bun run deploy` (gh-pages) exists as a manual fallback.

## Architecture

Vite + React 18 + TypeScript + Tailwind SPA. It is the reference site for the "RPG Hell" tabletop game: a markdown rulebook plus browsable/filterable tables of game content (Traits, Arts/Spells, Items, Creatures), a character sheet, and GM tools.

### Base path matters everywhere

The app is served from a subpath. `vite.config.ts` sets `base: "/rpg-hell-frontend"` and `main.tsx` sets the matching router `basename`. Both must stay in sync, and dev URLs include the prefix.

### Routing

All routes are declared in one place: `src/main.tsx` (`createBrowserRouter`), wrapped by `components/layouts/RootLayout.tsx`. Top-level groups: `/` (App), `/rulebook/*`, `/tools/*`, `/character-sheet*`, `/joshhellscape`, `/callback`. Adding a page means adding the import and route object there, except for markdown rulebook pages, which come from `rulebook/pages.ts` (see below).

### Data flow: offline JSON is the source of truth

The generated API client (`src/client`, from `openapi.json`, backend `https://portof.yokohama` configured in `hooks/useApi.tsx`) is **mostly bypassed**. Content is read from static JSON checked into `src/assets/OfflineJsons/` (`traits.json`, `spells.json`, `items.json`, `creatures.json`) and imported directly. The client is still live only for auth (`context/AuthProvider.tsx`, `components/auth/Login.tsx`) and `WepCreatorPage`. The commented-out fetch/auth-gated-"BROKEN"-filtering code in `hooks/useApiClass.tsx` and `hooks/useTraits.tsx` is the old online path — keep that in mind before "fixing" it.

The generic hook `hooks/useApiClass.tsx` drives every content page: it picks the JSON by `eApiClass` (`types/ApiClassUnions.tsx`), sorts it with `util/sortingTools.tsx`, and exposes `{all, pinned, displayed, addToPinned, removeFromPinned, filter, resetFilter}`. `useTraits`/`useSpells`/`useItems`/`useCreatures` are thin per-type wrappers over it. Pins persist to `localStorage` under keys like `pinnedTraitNames`, stored as names joined by the `;|;` separator and re-resolved against the list on load (`util/tableTools.tsx`).

Content objects are flat and stringly-typed (see `src/client/models/Trait.ts` etc.): `req`/`tags` are comma-separated strings like `"fighter 1"`, `"nature 2"`, not arrays. Sorting, filtering, and pill rendering all parse these strings.

The vocabulary files (`effects.json`, `keys.json`) are not read through `useApiClass`. They belong to the glossary (`src/glossary/CLAUDE.md`).

### Editing game content

All Game rules and content files (in the form of json and md files) should be edited by humans only.

### Glossary and rulebook

Each folder carries its own `CLAUDE.md`, loaded automatically when you work on files inside it.

-   `src/glossary/CLAUDE.md`: vocabulary sources and the registry, the keyword scanner, tooltips. Read it before adding a glossary source, changing which words get tooltips, or wiring `formatEffectString` or `GlossaryTooltipLayer` into a new table or card.
-   `src/rulebook/CLAUDE.md`: the page list, `?raw` loading, the remark chain, content directives, stat colouring. Read it before adding a rulebook page, editing a `.md` file that contains `::` directives, or changing how markdown renders.

Dependency direction: `rulebook` imports `glossary`; `glossary` imports `util` and `styling`, and only the `RulebookPageSlug` type from `rulebook/pages.ts`.

### Color system (the load-bearing convention)

Skill/stat names are also Tailwind color names: `body, mind, soul, arcana, charm, crafting, nature, medicine, thieving` (plus `core, base, dark, light, aabase`), defined in `tailwind.config.js`. Three things depend on this:

-   Stat words get wrapped in `text-<stat>-700`: `rulebook/remarkHighlightKeywords.ts` for rulebook markdown, `glossary/scan.ts` (through `formatEffectString`) for plain effect strings in cards, tables, and tooltips. Both read `STAT_COLORS` and `statColorClass` from `styling/statColors.ts`.
-   `toPillElement` builds `bg-<word>` classes from `req`/`tags` strings, mapping rarity/class words (e.g. `legendary` → `arcana`, `craftsman` → `crafting`) onto the same palette.
-   Each glossary source's `pillColor` returns a literal `bg-<color>` class for the tooltip pill.

Because these class names are constructed at runtime, `tailwind.config.js` has a `safelist` regex for `(bg|ring|text)-<color>-<shade>`. Any new stat/rarity color must be added to the theme **and** covered by the safelist, or it will silently render with no color. Some components (e.g. `traitCard.tsx`) keep a dummy array of literal class strings for the same reason.

### UI conventions

-   Per-content-type page structure is duplicated across Traits/Spells/Items/Creatures: `XTablePage` (page + pins + tabs + `SearchGroup`) → `XTable` (dense table) and `XCardStuff/xCard*` (card view). Changes to one usually need mirroring in the others.
-   Buttons go through `components/ui/Button/Button.tsx` + `styling/buttonVariants.ts` (`class-variance-authority`), with variants named after the palette (`variant="body"`, `"subtle-nature"`, `"link-body"`). Merge classes with `cn()` from `styling/utilites.ts`.
-   `@headlessui/react` supplies `Tab`, `Disclosure`, `Combobox` (wrapped as `joshhellscapePages/CleanCombobox.tsx`); icons come from `@heroicons/react` and `assets/IconSVGs/`.
-   Global element styling is done with `@layer base` `@apply` rules in `src/index.css` (h1–h3, p, a, hr), so plain markdown output is already styled. The site is dark-mode-only (`color-scheme: dark`).

### Style

Prettier config is non-default: 4-space indent, double quotes, 80 cols, `prettier-plugin-tailwindcss`. TypeScript is `strict` with `noUnusedLocals`/`noUnusedParameters`.

### Comments

default to writing no comments. Never write multi-paragraph docstrings or multi-line comment blocks — one short line max

do not reference old code or functionality

test files may have docstrings explaining each edge case test, try to stay concise.
