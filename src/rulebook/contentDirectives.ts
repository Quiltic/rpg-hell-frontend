import { Effect, allEffects } from "../glossary/effects";
import { Key, allKeys } from "../glossary/keys";
import { generateSlug } from "../util/slug";
import {
    DirectiveSource,
    DirectiveSources,
    remarkContentDirectives,
} from "./remarkContentDirectives";
import { titleCase } from "../util/textFormatting";

function bullet(name: string, effect: string): string {
    return `**_${titleCase(name)}_** - ${effect}`;
}

// `::effects{category="bane"}` in a rulebook .md file expands to the bullets
// for every matching record in effects.json, in file order.
export const effectsSource: DirectiveSource<Effect> = {
    records: allEffects,
    toLine(effect) {
        return bullet(effect.name, effect.effect);
    },
    idOf(effect) {
        return `effect-${generateSlug(effect.name)}`;
    },
};

// `::keys{source="item"}` — the per-table key lists in spell_key.md and
// item_key.md. The source is part of the id because FullDoc renders both keys
// on one page.
export const keysSource: DirectiveSource<Key> = {
    records: allKeys,
    toLine(key) {
        return bullet(key.name, key.effect);
    },
    idOf(key) {
        return `key-${key.source}-${generateSlug(key.name)}`;
    },
};

export const contentDirectiveSources: DirectiveSources = {
    effects: effectsSource,
    keys: keysSource,
};

// The plugin instance MarkdownRenderer passes to react-markdown.
export const contentDirectives = remarkContentDirectives(
    contentDirectiveSources
);
