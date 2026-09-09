import { GLOSSARY_SOURCES } from "../glossary";
import {
    DirectiveSources,
    remarkContentDirectives,
} from "./remarkContentDirectives";

// `::effects{category="bane"}` and `::keys{source="item"}` expand into the
// bullets for every matching record, in file order. The directive name is the
// source's `kind`, so registering a glossary source registers its directive.
export const contentDirectiveSources: DirectiveSources = Object.fromEntries(
    GLOSSARY_SOURCES.map((source) => [source.kind, source])
);

// The plugin instance MarkdownRenderer passes to react-markdown.
export const contentDirectives = remarkContentDirectives(
    contentDirectiveSources
);
