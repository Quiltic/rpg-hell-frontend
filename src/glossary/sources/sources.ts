import { definitionsSource } from "./definitions";
import { effectsSource } from "./effects";
import { keysSource } from "./keys";
import { GlossarySource } from "./source";

// Order is collision precedence: the first source holding a name wins.
export const GLOSSARY_SOURCES: GlossarySource[] = [
    effectsSource,
    definitionsSource,
    keysSource,
];
