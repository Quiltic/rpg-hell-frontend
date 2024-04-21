import { Creature, Item, Spell, Trait } from "../client";

export type ApiClassArrayUnion =
    | Array<Trait>
    | Array<Item>
    | Array<Spell>
    | Array<Creature>;

export type ApiClassUnion = Trait | Item | Spell | Creature;

export enum eApiClass {
    "Trait",
    "Item",
    "Spell",
    "Creature",
}
