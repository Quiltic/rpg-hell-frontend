export type playerCharacterType = {
    name: string;
    level: number;
    stats: {
        body: number;
        mind: number;
        soul: number;
        arcana: number;
        charm: number;
        finesse: number;
        nature: number;
    };
    calculatedStats: {
        // can be modified by player but is auto calculated if not
        speed: number;
        dodge: number;
        shielding: number;

        maxHp: number;
        curHp: number;
        maxStrain: number;
        curStrain: number;
    };
    items: Array<string>; // any number of items, auto lookup if short, otherwise its "Name - description" as made by player
    equipped: Array<string>; // lefthand, righthand, armor, mysc,,,,

    paths: Array<string>; // get two at lvl 1 then one more at lvl 3
    traits: Array<Array<string>>; // # of traits per tier, 3,3,2,2,1
    arts: Array<Array<string>>; // # of Arts per tier, 5,3,2,2,1

    stories: string;
    description: string;
    notes: string;
};
