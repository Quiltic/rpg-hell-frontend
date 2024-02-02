
const markdown = `
[NAME] - LEVEL: __ [RACE]

(Max of 6, get level+1 increases.)
Body: 0, Mind: 0, Soul: 0

(Max of level+1 up to 6 max; you get 2xlevel+2)
Arcana: 0, Charm: 0, Crafting: 0, Nature: 0, Medicine: 0, Thieving: 0

Soul Strain - 0/[3*Soul]
Armor: [0] Health: ##/(5*Body + 3*Mind + Soul + LEVEL), Speed [6]. 
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

**Spells:** (You know a number equal to your Soul Strain)


**Items:**
Weapon 1 - ___
Weapon 2 - ___
Armor - ___
Coin - 15
Bandage x 1
Take 1 Tool (item with the tag Tool), and 2 non-magical items of your choice

`;
export default markdown;