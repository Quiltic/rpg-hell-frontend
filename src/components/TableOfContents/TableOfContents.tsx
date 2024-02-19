import TableOfContentsBlock from "./TableOfContentsBlock";
import { TableOfContentsItem } from "../../types/TableOfContentsItem";

const basicContents: TableOfContentsItem = {
    name: "Basic Rules",
    anchorHref: "basics",
    className: "",
    subItems: [
        {
            name: "Locking Dice",
        },
        {
            name: "Magic",
        },
        {
            name: "Rest and Travel",
            className: "font-semibold",
            collapsable: true,
            subItems: [
                {
                    name: "Rest",
                },
                {
                    name: "Travel",
                },
            ],
        },
        {
            name: "Out of Combat",
            anchorHref: "out-of-combat-rules",
            className: "font-semibold",
            collapsable: true,
            subItems: [
                {
                    name: "Actions",
                    subItems: [
                        {
                            name: "Checks",
                        },
                        {
                            name: "Contests",
                        },
                    ],
                },
            ],
        },
        {
            name: "Combat",
            anchorHref: "combat",
            className: "font-semibold",
            collapsable: true,
            subItems: [
                {
                    name: "Initiative",
                },
                {
                    name: "Action Dice (AD)",
                    anchorHref: "action-dice-ad",
                    subItems: [
                        {
                            name: "AD Values Matter",
                        },
                    ],
                },
                {
                    name: "Damage and Armor",
                },
                {
                    name: "Death's Door",
                    anchorHref: "deaths-door",
                },
            ],
        },
    ],
};

const statsSkillsContents: TableOfContentsItem = {
    name: "Stats and Skills",
    anchorHref: "common-actions",
    className: "",
    subItems: [
        {
            name: "DL Table",
            anchorHref: "dl-table",
        },
        {
            name: "Body",
            className: "font-semibold text-body dark:text-body-700",
            collapsable: true,
            subItems: [
                {
                    name: "Physical Feats",
                },
                {
                    name: "Acrobatics or Athletics",
                },
            ],
        },
        {
            name: "Mind",
            className: "font-semibold text-mind dark:text-mind-700",
            collapsable: true,
            subItems: [
                {
                    name: "Investigate",
                },
                {
                    name: "Remember",
                },
            ],
        },
        {
            name: "Soul",
            className: "font-semibold text-soul dark:text-soul-700",
            collapsable: true,
            subItems: [
                {
                    name: "Make a Prayer",
                },
            ],
        },
        {
            name: "Arcana",
            className: "font-semibold text-arcana dark:text-arcana-700",
            collapsable: true,
            subItems: [
                {
                    name: "Read Runes",
                },
            ],
        },
        {
            name: "Charm",
            className: "font-semibold text-charm dark:text-charm-700",
            collapsable: true,
            subItems: [
                {
                    name: "Convince someone of Something",
                },
                {
                    name: "Discern others Intentions",
                },
                {
                    name: "Performance: Sing/Tell a Story/Tell a Joke",
                    anchorHref: "performance-sing-tell-a-story-or-tell-a-joke",
                },
            ],
        },
        {
            name: "Crafting",
            className: "font-semibold text-crafting dark:text-crafting-700",
            collapsable: true,
            subItems: [
                {
                    name: "Make an Item",
                },
                {
                    name: "Understand a Contraption",
                },
            ],
        },
        {
            name: "Nature",
            className: "font-semibold text-nature dark:text-nature-700",
            collapsable: true,
            subItems: [
                {
                    name: "Scrounge",
                },
                {
                    name: "Handle a Beast",
                },
                {
                    name: "Track a Creature",
                },
            ],
        },
        {
            name: "Medicine",
            className: "font-semibold text-medicine dark:text-medicine-700",
            collapsable: true,
            subItems: [
                {
                    name: "Identify an Illness or Curse",
                },
                {
                    name: "Travel",
                },
            ],
        },
        {
            name: "Thieving",
            className: "font-semibold text-thieving dark:text-thieving-700",
            collapsable: true,
            subItems: [
                {
                    name: "Steal or place an Item",
                },
                {
                    name: "Hide",
                },
            ],
        },
    ],
};

const characterCreationContents: TableOfContentsItem = {
    name: "Making a Character",
    anchorHref: "making-a-character",
    subItems: [
        {
            name: "Level 1",
        },
        {
            name: "Leveling up!",
            anchorHref: "leveling-up",
        },
        {
            name: "Leveling Table",
            anchorHref: "useful-level-table",
        },
        {
            name: "Lineage Table",
            anchorHref: "lineage-table",
        },
    ],
};

const statusesContents: TableOfContentsItem = {
    name: "Status Effects",
    anchorHref: "stack-effects",
    subItems: [
        {
            name: "Soul Strain",
            className: "text-soul dark:text-soul-700",
        },
        {
            name: "Statuses",
            anchorHref: "stack-effects",
            collapsable: true,
            subItems: [
                {
                    name: "Burn",
                },
                {
                    name: "Wet",
                },
                {
                    name: "Bleed",
                },
                {
                    name: "Stun",
                },
                {
                    name: "Webbed",
                },
                {
                    name: "Grappled",
                },
                {
                    name: "Marked",
                },
                {
                    name: "Hidden",
                },
                {
                    name: "Invisible",
                },
                {
                    name: "Flying",
                },
                {
                    name: "Incorporeal",
                },
                {
                    name: "Silenced",
                },
            ],
        },
    ],
};

const myscContents: TableOfContentsItem = {
    name: "Mysc Rules",
    anchorHref: "mysc-rules",
    subItems: [
        {
            name: "Followers",
            // className: "text-soul dark:text-soul-700",
        },
        {
            name: "Weather Conditions",
            // anchorHref: "stack-effects",
            collapsable: true,
            subItems: [
                {
                    name: "Clear",
                },
                {
                    name: "Snowfall",
                },
                {
                    name: "Rain",
                },
                {
                    name: "Winds",
                },
                {
                    name: "Sun",
                },
            ],
        },
        {
            name: "Rough Terrain",
            // className: "text-soul dark:text-soul-700",
        },
    ],
};

export default function TableOfContents() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <TableOfContentsBlock item={basicContents} />
            <TableOfContentsBlock
                item={statsSkillsContents}
                className="row-span-2"
            />
            <TableOfContentsBlock item={characterCreationContents} />
            <TableOfContentsBlock item={myscContents} />
            <TableOfContentsBlock item={statusesContents} />
        </div>
    );
}
