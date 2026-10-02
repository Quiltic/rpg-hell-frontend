import pathsJson from "../../assets/OfflineJsons/paths.json";
import { generateSlug } from "../../util/slug";
import { GlossarySource, bullet, findRecord } from "./source";

export type Path = {
    name: string;
    source: string;
    description: string;
    short: string;
    icon: string;
    color: string;
    effect: string;
    tooltip: false;
};

// Paths share words with ordinary effect text ("face", "spirits"), so they stay out of the scanner.
export const allPaths: Path[] = pathsJson.map((p) => ({
    ...p,
    effect: p.description || p.short,
    tooltip: false,
}));

export function getPath(name: string): Path | undefined {
    return findRecord(allPaths, name);
}

export const pathsSource: GlossarySource<Path> = {
    kind: "paths",
    records: allPaths,
    page: () => "character-creation",
    anchor: (p) => `path-${generateSlug(p.name)}`,
    label: () => "path",
    pillColor: (p) => `bg-${p.color}`,
    toLine: (p) => `${p.icon} ${bullet(p.name, p.effect)}`,
};
