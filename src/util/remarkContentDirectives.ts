import { remark } from "remark";
import { visit } from "unist-util-visit";
import type { List, Paragraph, Root } from "mdast";
import type { LeafDirective } from "mdast-util-directive";
import { formatEffectString } from "./textFormatting";

// A content source a `::name{...}` leaf directive can expand into a list.
// Methods (not function properties) so a DirectiveSource<Effect> is assignable
// to the DirectiveSource<Record<string, unknown>> the plugin stores.
export type DirectiveSource<T> = {
    records: T[];
    // Markdown for one bullet, without the leading "-   ".
    toLine(record: T): string;
    // DOM id for the bullet's <li>, so it can be deep-linked.
    idOf(record: T): string;
};

type AnyRecord = Record<string, unknown>;
export type DirectiveSources = Record<string, DirectiveSource<AnyRecord>>;

// Boolean attribute: `::effects{category="bane" tight}` renders a tight list
// (no <p> inside each <li>). Default is loose, matching a hand-written list
// with blank lines between bullets.
const TIGHT_ATTR = "tight";

function failure(name: string, reason: string): Paragraph {
    const value = `[${name}: ${reason}]`;
    console.warn(`remarkContentDirectives: ${value}`);
    return { type: "paragraph", children: [{ type: "text", value }] };
}

function hasOwn(record: AnyRecord, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(record, key);
}

function describeFilters(filters: [string, string][]): string {
    return filters.map(([key, value]) => `${key}="${value}"`).join(" ");
}

// Turns one directive node into the list it stands for, or a visible failure
// paragraph. Every attribute except `tight` is an equality filter on the
// records; no attributes means every record.
export function expandDirective(
    node: LeafDirective,
    sources: DirectiveSources
): List | Paragraph {
    const source = sources[node.name];
    if (!source) {
        return failure(node.name, `unknown directive "${node.name}"`);
    }

    const attributes = node.attributes ?? {};
    const tight = TIGHT_ATTR in attributes;
    const filters = Object.entries(attributes)
        .filter(([key]) => key !== TIGHT_ATTR)
        .map(([key, value]) => [key, value ?? ""] as [string, string]);

    const unknownKey = filters.find(
        ([key]) => !source.records.some((record) => hasOwn(record, key))
    );
    if (unknownKey) {
        return failure(node.name, `unknown attribute "${unknownKey[0]}"`);
    }

    const matches = source.records.filter((record) =>
        filters.every(([key, value]) => String(record[key]) === value)
    );
    if (matches.length === 0) {
        return failure(
            node.name,
            `no entries for ${describeFilters(filters) || "(all)"}`
        );
    }

    // Build markdown and re-parse it rather than assembling mdast by hand so
    // bold, inline html, and the stat-colour spans injected by
    // formatEffectString all come through the same way as hand-written bullets.
    const markdown = matches
        .map((record) => `-   ${source.toLine(record)}`)
        .join(tight ? "\n" : "\n\n");
    const list = remark().parse(formatEffectString(markdown))
        .children[0] as List;

    list.children.forEach((item, i) => {
        item.data = {
            ...item.data,
            hProperties: { id: source.idOf(matches[i]) },
        };
    });

    return list;
}

// remark plugin factory. Usage:
//   remarkPlugins={[remarkDirective, remarkContentDirectives({ effects })]}
export function remarkContentDirectives(sources: DirectiveSources) {
    return () => (tree: Root) => {
        visit(tree, "leafDirective", (node, index, parent) => {
            if (!parent || index === undefined) {
                return;
            }
            parent.children[index] = expandDirective(node, sources);
        });
    };
}
