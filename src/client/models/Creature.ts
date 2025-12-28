/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Creature = {
    name: string;
    types: string;
    level: number;
    descriptor: string;
    how_act: string;

    health: number;
    shielding: number;
    dodge: number;
    ward: number;
    strain: number;
    speed: number;

    stats: {
        body: number;
        mind: number;
        soul: number;
        arcana: number;
        crafting: number;
        charm: number;
        thieving: number;
        nature: number;
        medicine: number;
    }

    actives: string;
    passives: string;

    notes?: string;
};


    

    