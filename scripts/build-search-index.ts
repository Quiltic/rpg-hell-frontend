import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { GLOSSARY_SOURCES } from "../src/glossary/sources/sources";
import { RULEBOOK_PAGES } from "../src/rulebook/pageList";
import { buildDocuments } from "../src/search/documents/buildDocuments";
import type { SearchSource } from "../src/search/types";
import traits from "../src/assets/OfflineJsons/traits.json";
import items from "../src/assets/OfflineJsons/RefinedItems.json";
import spells from "../src/assets/OfflineJsons/spells.json";
import creatures from "../src/assets/OfflineJsons/creatures.json";

const root = fileURLToPath(new URL("..", import.meta.url));
const MARKDOWN_DIR = join(root, "src/assets/RulebookFiles/markdown");

const outFlag = process.argv.indexOf("--out");
const outDir = outFlag === -1 ? join(root, "src/generated") : resolve(process.argv[outFlag + 1]);

const pages = RULEBOOK_PAGES.flatMap((page) =>
    "file" in page
        ? [{ slug: page.slug, title: page.title, markdown: readFileSync(join(MARKDOWN_DIR, page.file), "utf8") }]
        : []
);

const index = buildDocuments({
    pages,
    sources: GLOSSARY_SOURCES,
    content: { traits, spells, items, creatures },
    hash: (json) => createHash("sha1").update(json).digest("hex"),
});

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "searchIndex.json"), JSON.stringify(index, null, 2) + "\n");
writeFileSync(join(outDir, "searchIndex.hash.ts"), `export const SEARCH_INDEX_HASH = "${index.hash}";\n`);

const counts = new Map<SearchSource, number>();
for (const { source } of index.documents) counts.set(source, (counts.get(source) ?? 0) + 1);
for (const [source, count] of counts) console.log(`${source}: ${count}`);
console.log(`${index.documents.length} documents, hash ${index.hash}, written to ${outDir}`);
