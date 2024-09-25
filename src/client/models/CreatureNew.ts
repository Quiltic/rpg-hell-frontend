/* Josh Made this. This is probably what we should have for the creature types from here on. */

export type CreatureNew = {
    id: number;
    name: string;
    types: Array<string>;
    level: number;
    body: number;
    mind: number;
    soul: number;
    arcana: number;
    crafting: number;
    charm: number;
    thieving: number;
    nature: number;
    medicine: number;
    augments?: Array<string>;
    traits?: string;
    arts?: string;
    items?: string;
    notes?: string;
};

