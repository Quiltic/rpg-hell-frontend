
const markdown = `
[NAME] - LEVEL: __ [RACE]

(Max of 4)
Body: 0, Mind: 0, Soul: 0

(Max of 4)
Arcana: 0, Charm: 0, Crafting: 0, Nature: 0, Medicine: 0, Thieving: 0

Strain - 0/[Body + 2*Mind + 3*Soul]
Armor: [0] Health: __/(4*Body + 3*Mind + 2*Soul + LEVEL), Speed [6]. 
Locked: [], Combat Dice: __ (starts at 4, goes up every even level)

**Traits:** (Trait for each level; you must meet the requirements to take the trait)
RACE:
1: 
1: 
1: 
2: 
3: 
4: 
5: 
6: 
7: 
8: 
9: 

**Techniques:** (Know 2*Body with a max Strain value of Level +1)

**Insights:** (Know 2*Mind with a max Strain value of Level +1)

**Spells:** (Know 2*Soul with a max Strain value of Level +1)



**Items:**
Weapon 1 - ___
Weapon 2 - ___
Armor - ___
Coin - 15
Bandage x 1
Take 1 Tool (item with the tag Tool), and 2 non-magical items of your choice

`;
export default markdown;