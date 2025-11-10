
const markdown = `

[NAME] - LEVEL: []

(Assign : +2) [At lvl 3/5/7/9/etc gain +1]
Body: 0, Mind: 0, Soul: 0

(Assign : 2,1,1,0,-1,-1) [At lvl 3/5/7/9/etc gain +1/+1]
Arcana: 0, Charm: 0, Crafting: 0, Nature: 0, Medicine: 0, Thieving: 0

Strain - 0/[2*Body + 3*Mind + 4*Soul + LEVEL]
SHIELDING: [0] Health: __/(4*Body + 3*Mind + 2*Soul + LEVEL), Speed [6]. 
Locked: [], Combat Dice: (4+LEVEL/2 (round down))

Stories: (3 of Anything you want)


**Traits:** (1+LEVEL; you must meet the requirements to take the trait at the level it was taken)


**Arts:** (Pick 3+LEVEL Arts)



**Items:**
Weapon 1 - ___
Weapon 2 - ___
Armor - ___
Plates ($) - 4d6+10 (or 24)
Bandage x 1
Choose 1 Gadget
Choose 2 non-magical items
`;
export default markdown;