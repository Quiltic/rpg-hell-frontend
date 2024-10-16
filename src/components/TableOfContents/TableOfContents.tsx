import TableOfContentsBlock from "./TableOfContentsBlock";
import { TableOfContentsItem } from "../../types/TableOfContentsItem";


const basicContents: TableOfContentsItem = {
    name: "Main Rules",
    anchorHref: "main-rules",
    className: "",
    subItems: [
        {
            name: "Locking Dice",
        },
        
        {
            name: "Checks and Contests",
            anchorHref: "checks-and-contests",
            className: "font-semibold",
            collapsable: true,
            subItems: [
                {
                    name: "Checks",
                },
                {
                    name: "Contests",
                }
            ],
        },
        {
            name: "Default Actions",
            anchorHref: "default-actions",
            className: "font-semibold",
            collapsable: true,
            subItems: [
                {
                    name: "Perception and Investigation",
                },
                {
                    name: "Search",
                },
                {
                    name: "Arts",
                },
                {
                    name: "Shove",
                },
                {
                    name: "Grapple",
                },
                {
                    name: "Move",
                },
                {
                    name: "Attack",
                },
                {
                    name: "Jump",
                },
                {
                    name: "Lock a Dice",
                },
                {
                    name: "Hide",
                }
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
                            name: "Attack Dice Values Matter",
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
        {
            name: "Traits",
        },
        {
            name: "Arts and Strain",
            anchorHref: "arts-and-strain",
            className: "font-semibold",
            collapsable: true,
            subItems: [
                {
                    name: "Techniques",
                    className: "font-semibold text-body dark:text-body-700",
                },
                {
                    name: "Insights",
                    className: "font-semibold text-body dark:text-mind-700",
                },
                {
                    name: "Spells and Magic",
                    className: "font-semibold text-body dark:text-soul-700",
                },
            ]
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
    ],
};

const statsSkillsContents: TableOfContentsItem = {
    name: "Stats and Skills",
    anchorHref: "stats-and-skills",
    className: "",
    subItems: [

        {
            name: "Basic Stats",
            anchorHref: "basic-stats",
            className: "font-semibold",
            collapsable: true,
            subItems: [
                {
                    name: "Health",
                    className: "font-semibold text-body dark:text-charm-700",
                },
                {
                    name: "Armor",
                    className: "font-semibold text-body dark:text-thieving-700",
                },
                {
                    name: "Max Strain",
                    className: "font-semibold text-body dark:text-soul-700",
                },
                {
                    name: "Speed",
                    className: "font-semibold text-body dark:text-arcana-700",
                },
            ],
        },
        {
            name: "Core Stats",
            anchorHref: "checks-and-contests",
            className: "font-semibold",
            collapsable: true,
            subItems: [
                {
                    name: "Body",
                    className: "font-semibold text-body dark:text-body-700",
                },
                {
                    name: "Mind",
                    className: "font-semibold text-mind dark:text-mind-700",
                },
                {
                    name: "Soul",
                    className: "font-semibold text-soul dark:text-soul-700",
                },
            ],
        },
        {
            name: "Sub Stats",
            anchorHref: "sub-stats",
            className: "font-semibold",
            collapsable: true,
            subItems: [
                {
                    name: "Arcana",
                    className: "font-semibold text-arcana dark:text-arcana-700",
                },
                {
                    name: "Charm",
                    className: "font-semibold text-charm dark:text-charm-700",
                },
                {
                    name: "Crafting",
                    className: "font-semibold text-crafting dark:text-crafting-700",
                },
                {
                    name: "Nature",
                    className: "font-semibold text-nature dark:text-nature-700",
                },
                {
                    name: "Medicine",
                    className: "font-semibold text-medicine dark:text-medicine-700",
                },
                {
                    name: "Thieving",
                    className: "font-semibold text-thieving dark:text-thieving-700",
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
    anchorHref: "status-effects",
    subItems: [
        {
            name: "Duration Effects",
            anchorHref: "duration-effects",
            collapsable: true,
            subItems: [
                {
                    name: "Focus"
                },
                {
                    name: "Windup"
                },
                {
                    name: "Prone"
                },
                {
                    name: "Grappled"
                },
                {
                    name: "Obscured"
                },
                {
                    name: "Hidden"
                },
                {
                    name: "Hover"
                },
                {
                    name: "Flying"
                },
                {
                    name: "Silenced"
                },
                {
                    name: "Light Headed"
                },
                {
                    name: "Invisible"
                },
                {
                    name: "Incorporeal"
                },
                {
                    name: "Blind"
                },
                {
                    name: "Poisoned"
                },
                {
                    name: "Sparking"
                },
            ]
        },
        {
            name: "Stack Effects",
            anchorHref: "stack-effects",
            collapsable: true,
            subItems: [
                {
                    name: "Burn"
                },
                {
                    name: "Bleed"
                },
                {
                    name: "Stun"
                },
                {
                    name: "Slow"
                },
                {
                    name: "Wet"
                },
                {
                    name: "Marked"
                },
            ]
        }
    ],
};


// Mysc Rules
// Followers
// Crafting Items
// Knockback and Fall Damage
// Mounts and Vehicles
// Rough Terrain

// Item Tags

// GM Advice

const myscContents: TableOfContentsItem = {
    name: "Mysc Rules",
    anchorHref: "mysc-rules",
    subItems: [
        {
            name: "Followers",
        },
        {
            name: "Crafting Items",
            anchorHref: "making-items",
        },
        {
            name: "Knockback and Fall Damage",
        },
        {
            name: "Mounts and Vehicles",
        },
        {
            name: "Rough Terrain"
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
            name: "Item Tags"
        },
        {
            name: "GM Advice"
        },
    ],
};

export default function TableOfContents() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <TableOfContentsBlock item={basicContents} 
                className="row-span-2"
            />
            
            <TableOfContentsBlock item={characterCreationContents} />
            <TableOfContentsBlock item={myscContents}
                className="row-span-2"
             />
            <TableOfContentsBlock
                item={statsSkillsContents}
                // className="row-span-2"
            />
            <TableOfContentsBlock item={statusesContents} />
            
        </div>
    );
}
