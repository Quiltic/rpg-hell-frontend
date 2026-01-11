/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Spell = {
    name: string;
    level: number;
    stat: "body"|"mind"|"soul"|"arcana"|"charm"|"crafting"|"medicine"|"nature"|"thieving" ;

    tags?: string;
    strain: number;
    dice: number;
    
    effect: string;
    activators: number;
};

