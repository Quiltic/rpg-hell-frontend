const markdown = `

# Basics

This game is built up around the idea of normal dice (d6's, or 6 sided dice). Any and all rolls that this game will ask you to do will be done using some amount of these dice, so go grab some. Personally I would recommend 4-6 per person, though you can play this with just 1 if need be.
This game is heavily inspired by YOU the players and your host known as the Game Master (denoted as GM from here on). The GM is the one hosting the show, and while this is the rule-book not all possible situations can be given clear ruling. Envitably, it is up to the GM to decide what will happen. 

There are primarily 2 sections to this game, Out of Combat; which is where most roll-playing will take place, and In Combat; which is where you fight monsters and other stuff.

For a complete and up to date rule set go to [https://docs.google.com/document/d/1h8yUHFGRlDEHiQ5K4UsqGjIkeFcHh8aEjj2FuqFQs_c/edit?usp=sharing](https://docs.google.com/document/d/1h8yUHFGRlDEHiQ5K4UsqGjIkeFcHh8aEjj2FuqFQs_c/edit?usp=sharing).





# Locking Dice

When you do any roll you may Lock one dice. This dice is set to the side and is removed from the current roll, ie you do not add it to sums or use it for actions. On later turns you may then **replace** a rolled dice with your Locked dice. 
Replacing a dice removes the replaced dice from play and uses the Locked dice. 
**You can Not have more than 1 Locked dice at a time.**

For example lets say I do a Physical Feats roll and roll five 6's. I probably don't need all five 6's for this roll so I can remove one of the 6's and have four 6's for this roll. Then, lets say I roll to Hide and get two 1's. I can replace one of the 1's with my Locked 6, and now I have a 6 and a 1 in my current roll. 





# Magic

Magic is the ability to control souls, both your own and others, to affect the world around them. Every creature, object, or place has a soul. Though typically only creatures are able to directly control souls.

As of now there are only 3 known ways to control soul: Strange grand movements which physically change the shape of souls, using Light to suppress or enhance souls, and through writing of Runes on items to bring out the items latent soul.

There are a number of ways to learn how to do magic. Some mages learn through intense study and hard work. Others learn how by tradition or special dances. Even more are born with such knowledge or even find them by shear coincidence.

Despite all this, the manipulation of souls is not without consequence. As such, when a creature or item cast or use magic, they may gain a number of stacks of Soul Strain based on how strong the spell they are casting is (denoted next to the spell). Depending on how much they have trained their Soul (points in Soul) they may start to take damage from casting. A creature takes an amount of damage based on how much Soul Strain they have over their Max Soul Strain. Your max Soul Strain is 3 times your Soul. Though some Traits, or Items can increase this slightly. You loose all stacks of Soul Strain when you finish a Rest.




# Rest and Travel
## Rest

When you spend 8 or more hours doing non-extraneous effort, such as sleeping or relaxing, you gain the effects of a Rest. Rests do not need to be completed all at once, and can be broken up into multiple segments of at least 2 hour increments. However, you can only Rest up to twice a Day.

When you complete a Rest you gain the following bonuses:
- You fully heal, and regain all Armor effects such as Armor Stacks, Dodge, and Ward.
- You loose all non permanent Stack Effects, such as Wet or Soul Strain (these are just 2 examples. See Stack Effects for more).
- You regain all uses of spent Trait effects. (Some traits will say "You can do this a number of times per Rest")
- You loose all Stacks of Death's Door



## Travel

When moving long distances you move based on the average of all party member's Speed (rounded down). For example if a party has 3 people with speeds of 7,6,4 then the travel speed is 5.

Large grid is used when dealing with travel. A large tile is 2,160*2,160 tiles. Medium tiles are 36*36 tiles (can be used to move per minute). __If your using hex like a chad then its the same but in hex shape.__
Every Hour your party can move a number of Large tiles equal to your Party Travel Speed, mentioned above. 
Alternatively, your party can move 1 tile faster at the cost of being permanently Marked for the duration of travel. This condition lasts into combat if you get ambushed.
Or your party can move 1 tile slower to try to Hide during travel. You can roll Nature or Thieving for this check.

When using Boats, Riding Animals, Carts, Cars, or some similar vehicle you replace your speed with that of the vehicle.





# Out of Combat Rules

## Actions

These are actions that anyone can do. The basic listing of actions any creature can do is listed under their respective stat/skill down below.

Some actions require traits or items to acquire. An example is the Tunneler Trait which lets you easily break and move solid land, such as dirt or stone. Or the ever famous Cooking Tools which allow you to make foods you otherwise would have to buy to acquire.

Actions generally have 3 different ways of operating: Checks (the most common type), Contests, and Activatable ones (toggles or just works without rolling).



### Checks

When you want to do an Action that requires a check, you roll a number of dice based on the required stat or skill. The number of dice is equal to 2 with an additional dice for every point you put into the required check.
For example if you want to do a Physical Feat you roll a Body check. If you have a 3 in Body then you roll 5 dice (2 from default plus 3 from Body).

Most (if not all) checks have you take the sum of all dice rolled and compare it to the Difficulty Level value (denoted as DL from here on). 
All checks have set ways that increase or decrease the DL, they are noted underneath their respective actions. The DL typically ranges from 0 to 9 where the value you need to get in order to pass is 6 + 3*DL.

Every action has 4 levels of success. Complete Failure (sum is less than the DL by 10 or more), Failure (sum is less than the DL), Success (the sum meets or beets the DL), and Great Success (sum is greater than the DL by 10 or more)

You then tell your GM what you rolled and what action you want to try and the GM will tell you what happens next. All of this is recited in the Difficulty Level (DL) Rules Listed below. There is also a table to help show what sums you need to succeed.



### Contests

Some Actions require Contests, which is a competition between two or more parties. When you or your GM incites a Contest, all party's then roll based on the required Stat or Skill. This being similar to the ways Checks work.
Whichever party has a higher sum wins the contest. If a tie happens it is based on which party rolled the higher individual dice values. Players always win if all dice are the same.





# Combat

Combat is split up into Rounds, each Round a creature has 3 phases; Beginning which is where they take damage or effects from Stack Effects and roll their COMBAT DICE. Their Action phase which is where they can spend COMBAT DICE to do actions. Lastly their end phase, which is where they loose stacks or effects.

## Initiative

All creatures in combat must roll Initiative to see when they may do their Actions in Combat. This value is calculated by rolling two dice then adding the characters Speed. Ties are decided based on the creatures base Speed (highest first).
Whichever creature has the highest Initiative goes first. Once all creatures have gone the Round is over and it goes back to being the first creatures turn.

The world (earthquakes, neutral NPC's, and other creature related actions) always go last in Initiative.



## Action Dice (AD)

At the beginning of your turn you roll an amount of dice based on your __COMBAT DICE__ (Temp name). 
You can spend these dice to do actions in Combat. Every action asks for a different amount of dice, denoted next to the Action as a number of #. Depending on the action taken the values for the dice may or may not matter.
For example, when you take/use the action Bull Rush it requires you to give it ##, or two dice. These dice values do not matter as you will always do its effect. On the other hand the Dagger Master trait asks for #, one dice, but requires a 6 to do its effect in combat.

Attacks and Contests count as ## (2 dice), Movement counts as # (1 dice), and Spells and Traits have varying amounts, which are listed next to them under Dice.



### Attack Dice Values Matter 

All weapons have special actions when you wield them. In order to be able to get this effect you must have the required Stat values, denoted next to the weapon. If you don't have these requirements you can still use the weapon but you only get the 4 or less effects regardless of dice values given.

On Attacks when you give ## (2 dice) you take the sum of these dice, sometimes giving special effects. Higher sums are better than lower sums. By default the high value is 9 and the low value is 4.
For example a sword (short or long) does 1 extra damage on a 9 or higher, and 1 less damage on a 4 or lower.




## Damage and Armor

Your Health is how much you can take before you are put on Death's Door. When you take damage you first reduce your Armor Stacks then your Health.

Armor grants an additional special set of Health called **Armor Stacks**. Different armors provide a varying amount of Armor Stacks. 
As stated above Armor Stacks are reduced before you take normal Health loss. Unlike normal Health Armor Stacks cannot be regained from Healing Items or most Spells.

You can have a max of 100 Armor Stacks at any given point in time.



## Death's Door

When you are on 0 or less life you are put on Death's Door. While on Death's Door your have a normal Speed of 2 and every time you take damage while on Death's Door you roll a dice. If you roll less than the Death's Door value you Die, otherwise you increase Death's Door by 1.
: For example if you are on Death's Door and roll a 3 you live another turn and are on Death's Door 2.
: Another example is if you are On Death's Door 5 and roll a 2 you Die.
Death's Door only goes away if you do a Rest.





# Common Actions

## Difficulty Level Rules

Most (if not all) checks have you take the sum of all dice rolled and compare it to the Difficulty Level value (denoted as DL from here on). 
You can roll varying levels of success or failure based on the total sum rolled.
Different DL levels happen for every type of roll and your gm may chose to increase or decrease this DL threshold based on circumstance.

All DL increases are listed above the results of the roll. With the value to succeed (goal) being 6 + 3*Difficulty Level (DL)

The levels of success are as follows:
- Complete Failure: Roll lower than the goal by 10 or more.
- Failure: Roll less than the goal.
- Success: Roll the goal or higher.
- Great Success: Roll higher than the goal by 10 or more.


## DL Table
| DL | Success value | Min stat to succeed |
| --- | --- | --- |
| 0 | 6 | -1 |
| 1 | 9  | 0 |
| 2 | 12 | 0 |
| 3 | 15 | 1 |
| 4 | 18 | 1 |
| 5 | 21 | 2 |
| 6 | 24 | 2 |
| 7 | 27 | 3 |
| 8 | 30 | 3 |
| 9 | 33 | 4 |


## Body

### Physical Feats
Do one of the following, increasing its DL appropriately.
Jump 2 tiles horizontally with a running start. Increase the DL by 1 for every 1 extra tile you want to jump.
Jump 1 tile vertical or horizontally. Increase the DL by 2 for every 1 extra tile you want to jump.
Lift/Push 100 lb thing with 2 hands. Increase the DL by 1 for every 100 extra lb you want to lift.
Lift/Push a 20 lb thing with 1 hand. Increase the DL by 1 for every 20 extra lb you want to lift.
Force open a door. This cannot be done quietly. The DL is 1 for normal doors, 3 for heavy doors, and 6 for reinforced doors. (GM may increase or decrease this value based on door type)

- Complete Failure: Fail miserably and sprain something, taking 1d6 damage in addition to any other effects from failing.
- Failure: You fail.
- Success: You succeed.
- Great Success: ___


### Acrobatics or Athletics
Most situations are based on GM ruling. However a good guideline for DL is: 1 for simple actions, 3 for novice actions, 5 for intermediate actions, 7 for advanced actions, and 9 for master actions.

- Complete Failure: Fail miserably and sprain something, taking 1d6 damage in addition to any other effects from failing.
- Failure: You fail.
- Success: You succeed.
- Great Success: This specific feat (doing a backflip, jumprope, etc) has become muscle memory to you, reducing the DL by 1 the next time you do this specific feat.



## Mind

### Investigate
When searching an area, items or clues in the area have their own discovery DLs determined by the GM. For example, a trinket under a bed would have a DL of 0, a notebook hidden under a false drawer bottom would have a DL of 9. You make 1 Roll to Investigate which the DM silently compares to the DLs of all hidden items or clues.

- Complete Failure: You take twice as long to search and find nothing.
- Failure: You find nothing.
- Success: You find the item or clue.
- Great Success: You find the item or clue in half the time.



### Remember
Most situations are based on GM ruling. However a good guideline for DL is: 0 for memories you deeply know, 1 for recent memories, 3 for old memories, and 9 for passing memories (such as a single sentence or word on a sign you have seen once).

- Complete Failure: You are completely blank on what you try to remember, forgetting what and why you are trying to remember.
- Failure: You don't remember.
- Success: You remember vague details about what you are trying to remember.
- Great Success: You remember most of the details about what you are trying to remember.



## Soul

### Make a Prayer
(This one is a work in progress)

- 7+ Ask your god a question. Increases by 7 for every question asked that day.
- Ask for aid, may require more than 7+. (GM's discretion)
- 21+ Talk to your god.


## Arcana

### Read Runes
Increase the DL by the writer's Arcana score.
Runes written increase the DL by the writers Arcana.

- Complete Failure: ___
- Failure: You have no idea what the runes say or do.
- Success: You know what the runes say, what the magic item does, how to use the magic item, or a more specific question based on the item (pick 1).
- Great Success: You know what the runes say, what the magic item does, how to use the magic item, and may ask a more specific question based on the item.



## Charm

### Convince Someone of Something
Increase the DL by the target's Charm.
The DL may also be affected by factors such as familiarity with the target and the target's feelings toward the player.
Some creatures and situations may increase or decrease this value depending on GM ruling. (Such as if the target would align with what you are convincing them of.)

- Complete Failure: They are not convinced and trust you less.
- Failure: They are not convinced.
- Success: They are convinced though they have their doubts and may ask for more (information, gold, lies).
- Great Success: They are thoroughly convinced.


### Discern Others Intentions
Increase the DL by the target's Charm

- Complete Failure: You have no idea what their intention is, and you believe they are telling the truth.
- Failure: You have no idea what their intention is, or if they are lying.
- Success: Determine the target's intention or if they are lying.
- Great Success: Determine the target's intention and if they are lying.


### Performance: Sing, Tell a Story, or Tell a Joke
Most situations are based on GM ruling. However a good guideline for DL is: 1 for commoners, 3 for middle class, 5 for nobility, 7 for royalty, and 9 for gods.

- Complete Failure: Everyone boo's you and tries to get you to stop, sometimes by physical means.
- Failure: You only attract 1 or two listeners if any. 
- Success: You attract a group of people nearby to come to listen to your performance. You may get some gold from listeners.
- Great Success: Everyone who can hear your performance nearby come to listen to you, and are distracted from focusing on other tasks. You will get some gold from listeners.




## Crafting

### Make an Item
Increase the DL by the crafted items Crafting score.
Spend 1 minute for a Crafting score of 0. Spend 10 minutes for a Crafting score of 1. For Crafting score of 2 or higher spend 30 minutes multiplied by the item's Crafting score.
This action cannot make weapons, armors, potions, complex items, or magic items (See Tools).

- Complete Failure: You fail to make the item and lose all gold spent trying to make the item.
- Failure: You do not finish the item, you reduce the time by half the next time you try to craft this item.
- Success: Spend the normal amount of time and half the gold cost of the item to create the item.
- Great Success: Spend half the time and half the gold cost of the item to create the item.



### Understand a Contraption
Increase the DL by the target's Crafting score.

- Complete Failure: You break the item.
- Failure: You have no idea what the item does.
- Success: You know what the item does, how to use the item, or more specific information based on the item.
- Great Success: You know what the item does, how to use the item, and more specific information based on the item.



## Nature

### Scrounge
(This one is a work in progress)

- 7+ Find 1 raw item (such as wood, herbs, or metal scraps), Travel Meal, or clean water source from the local environment. This can be done multiple times in a roll.

### Handle a Beast
Can only target a creature with the Animal tag.
Increase the DL by the creature's Level

- Complete Failure: Enrage or scare the creature, having it attack you or run away.
- Failure: You do not handle the Creature.
- Success: Successfully handle the Creature.
- Great Success: Successfully tame the Creature making it a Pet (Follower) for 1 hour. (If you get this option 4 times in 1 day this becomes Permanent)



### Track a Creature
Increase the DL by the target's Thieving if the target was Hiding.
Increase the DL by 1 for every Hour after the tracks were made.
Some creatures and situations may increase or decrease this value depending on GM ruling. (Such as weather conditions)

- Complete Failure: You add your own tracks into the mix increasing the DL by 1 next time someone Tracks.
- Failure: You cannot follow the tracks.
- Success: Follow tracks up to 12 tiles in length discovering the creature if it is within 4 tiles of you.
- Great Success: Follow tracks up to 24 tiles in length discovering the creature if it is within 4 tiles of you.



## Medicine

### Identify an Illness or Curse
Increase the DL by the targets Crafting score for Poisons
Increase the DL by the targets Soul Strain level for Curses
Increase the DL by the targets Level for Illnesses
Your GM has this information.

- Complete Failure: Do 1d6 damage the creature you are inspecting.
- Failure: You do not know anything about the Illness or Curse affecting the creature you are inspecting.
- Success: Determine if the target is Poisoned, Cursed, or is sick with an Illness.
- Great Success: Determine if the target is Poisoned, Cursed, or is sick with an Illness and how to cure them.
- Perfected Success: Determine if the target is Poisoned, Cursed, or is sick with an Illness, how to cure them and the name of the affliction.



## Thieving

### Steal or Place an Item
Increase the DL by the target's Level
Increase the DL by 1 for every group of 4 people nearby who can see you. (Excluding friendly party members)
If you are Hidden, decrease the DL by your Thieving.
Additional circumstances such as the size of the item in question could increase the DL

- Complete Failure: You are detected, losing Hidden if you are Hidden, and don't steal the item.
- Failure: You are not detected and do not steal/place the item.
- Success: You steal/place the item and lose Hidden if you are Hidden. The targets do not know you stole/placed something.
- Great Success: You steal/place the item undetected and do not lose Hidden.


### Hide
Increase the DL by 1 for every group of 4 people nearby who can see you. (Excluding friendly party members)
Increase the DL by 2 for every group of 2 people looking for you. (In combat all enemies who know of you will be looking for you)
Some creatures and situations may increase or decrease this value depending on GM ruling.

- Complete Failure: You do not become Hidden and are Marked for 1 minute (Gain 6 stacks of Marked).
- Failure: You do not become Hidden.
- Success: You are Hidden until you do any non-thieving action, other than moving, or move within 2 tiles of another non-friendly creature you are not stealing from.
- Great Success: You are Hidden until you do any non-damaging action or move within 1 tile of another non-friendly creature you are not stealing from.





# Making a Character

## Level 1

Pick a Lineage, listed below.
Then gain 2 Core Stat increases (Body, Mind, Soul), 4 Skill increases (), 3 Traits you meet the req for.

<span style="font-family: monospace; font-size: 1.3em">Health = Level + 4*Body + 3*Mind + 2*Soul</span>

<span style="font-family: monospace; font-size: 1.3em">Soul Strain = 3*Soul</span> and <span style="font-family: monospace; font-size: 1.3em">Known Spells = 2*Soul</span>. You cannot take spells that have a Soul Strain cost higher than your Level+1. 

You may take up to 2 Weapons, an Armor, 15 gold, a Bandage, an item with the Tool tag, and two non-magical items worth 15 gold or less.



## EXP

At the end of a session ask yourselves the following questions and gain the amount of XP listed before them if you answered yes.
- (5 XP) Did you find a new Region/Town/Location?
- (3 XP) Did your group survive a deadly encounter? (Half or more party members are on Death's Door)
- (2 XP) Did you complete a quest?
- (1 XP) Did you gain or spend a lot of money?
- (1 XP) Did you make new friends?
- (1 XP) Did you make/defeat new enemies?

(Level up exp values are a work in progress, but expect another table in this spot)


## Leveling Up!

Gain 1 Core Stat Increase, 2 Skill increases, and 1 new Trait.
No Stat or Skill can be higher than 1 plus your Level to a maximum of 6.

<span style="font-family: monospace; font-size: 1.3em">Remember to update Health, Armor and Soul Strain</span>


## Useful Level Table
| Level | Increases | Skill Increases | Traits | Dice |
| --- | --- | --- | --- | --- |
| 1 | 2 | 4 | 3 | 4 |
| 2 | 3 | 6 | 4 | 5 |
| 3 | 4 | 8 | 5 | 5 |
| 4 | 5 | 10 | 6 | 6 |
| 5 | 6 | 12 | 7 | 6 |
| 6 | 7 | 14 | 8 | 7 |
| 7 | 8 | 16 | 9 | 7 |
| 8 | 9 | 18 | 10 | 8 |
| 9 | 10 | 20 | 11 | 8 |


## Lineage Table
| Rolls | Lineage Type | Bonus Trait |
| --- | --- | --- |
| 1,1 | Generic Humanoid | Pick an extra Skill that doesn't require more than 1 in a Base Stat (Body, Mind, Soul), you must still meet it's requirement. |
| 1,2 | Undergrounder | You can cast Glow at will, and Fog Light once per Rest without gaining Soul Strain. These spells do not count against the number of known spells you may have. Additionally, you are small, and are able to squeeze into places you normally wouldn't. You act as half your size smaller when trying to get through or into a space you wouldn't fit in otherwise.|
| 1,3 | Aquatic | You can breath underwater without needing air, and you can swim your Speed. |
| 1,4 | Avian | You are able to glide 2 tiles for every 1 tile you fall. This effect does not work if your arms are hindered in any way (Being Grappled, caring something, ext.) |
| 1,5 | Beastkin | Increase your Speed by 1. |
| 1,6 | Draconic | When you lock a dice, increase its value by 1. This cannot increase a 6. |
| 2,1 | Naga-kin | When you grapple a creature within 1 tile of you, you may Bite them (no cost) to give them Poisoned for a number of turns equal to your Level. Additionally, you gain an extra dice when trying to Identify an Illness or Curse. |
| 2,2 | Seeker | You are mostly blind, only able to see things up to 2 tiles away. To counteract this you are able to see the Souls of living things up to 6 tiles away so long as they are not obstructed by solid objects such as walls. Additionally, you know the Spell 'Detect Magic'. This does not count against the number of known spells you may have. |
| 2,3 | Nature-born Elemental | You are able to have simple conversations with creatures that have the Animal Tag. Additionally, you know the Spell 'Control Elements'. This does not count against the number of known spells you may have. |
| 2,4 | Hell-born | After taking damage from Burn reduce it by 2 instead of 1. (Work in progress for second half) |
| 2,5 | Light-born | Heal 1 more whenever you would Heal. You can cast Glow at will. This spell does not count against the number of known spells you may have. |
| 2,6 | Constructed | Gain your Level additional Armor Stacks at the end of a Rest. Additionally, you may consume inorganic material as a food source. |






# Stack Effects

### Soul Strain
- How much your Soul has been affected by casting or being affected by magic.
- You can have an amount of Soul Strain equal to three times your Soul before you start taking damage.
- When you go over your Max Soul Strain you take damage equal to how much Soul Strain you have. This damage cannot be reduced and affects Health only. (Armor Stacks, Dodge, Ward, and other effects do not reduce this damage)

### Death's Door
- When you are on 0 or less life you are put on Death's Door. 
- While on Death's Door your have a normal Speed of 2 and every time you take damage while on Death's Door you roll a dice. 
- If you roll less than the Death's Door value you Die, otherwise you increase Death's Door by 1.

### Burn
- Removes stacks of Wet before other effects.
- 1 stack of Burn removes 1 stack of Wet
- At the beginning of your turn take an amount of Damage equal to the amount of Burn you have and reduce the Burn by 1.
- A creature can spend ## (2 dice) to put out all remaining stacks of Burn on itself or another creature.

### Wet
- Removes stacks of Burn before other effects
- 1 stack of wet removes 1 stack of Burn
- Wind spells do an additional 1 damage to you.
- The wording on wind spells is there to remind you. It does not do 2 extra damage
- At the beginning of your turn reduce Wet by 1.

### Bleed
- At the beginning of your turn take an amount of Damage equal to the amount of Bleed you have and reduce the Bleed by 1.
- If you are healed with a bandage, medkit or other healing ITEM remove all stacks of Bleed

### Poisoned
- You do 1 less damage from weapon attacks, and have Disadvantage on Body rolls.
- Punches are weapon attacks.

### Stun
- At the beginning of your turn lose a number of dice equal to the amount of Stun. (do not roll these when starting your turn)
- Example; If you start your turn normally rolling 5 dice but have 2 stacks of Stun you roll 3 for this turn instead
- Loose all stacks at the end of your turn.

### Webbed
- Set your Speed to 0. You cannot do the Move action.
- Reduce Webbed by 1 at the end of your turn.

### Grappled
- You have a Speed of 0, cant do the Move action, and can't Attack anything other than the source of the grapple. You can spend 2 dice (##) to make a Body Contest against the source of the grapple to remove this effect. 
- Does not reduce until the source stops grappling you, or you escape the grapple.

### Blinded
- You cannot see and fail any rolls that rely on sight. 
- All targets are classified as Hidden to you (including Marked targets) unless you succeed at a Search check. 
- Reduce by 1 at the end of your turn.

### Marked
- Cant become hidden.
- Reduce Marked by 1 at the end of your turn.
- Some Traits and effects have special interactions with Marked.

### Hidden
- You cannot be seen or heard when someone is not looking for you.
- You cannot be targeted by weapon or non area spells.
- Does not disappear until you come out of hiding or are revealed.

### Invisible
- You are Hidden, and cannot be detected by sight.
- Has no effect on creatures that rely on hearing instead of sight. Such as Sand Worms
- Reduce Invisible by 1 at the end of your Turn.

### Flying
- You can move your Speed in any direction that isn't through walls. 
- You are immune to slow terrain that is on the ground.

### Incorporeal
- You cannot interact with the world or Cast Spells. However you are able to force your way through walls and floors. 
- While incorporeal you can only interact with other Incorporeal things.
- Magic can still damage you while Incorporeal, however you cannot gain stack effects from magic, such as Burn.
- You cannot be damaged from non-magical damage.
- Reduce Incorporeal by 1 at the end of your Turn.

### Silence
- You cannot speak, cast spells, or activate the effects of your weapon. 
- Reduce Silence by 1 at the end of your Turn.


# Mysc Rules

## Followers

There are many forms of Follower, familiars, summons, undead, pets, random NPC's you picked up along the way, and more.
Out of combat followers act as expected. For example undead and familiars mill about waiting for their owner to give instructions, NPC's will give input or advice, and pets will... well, be pets. 
However, when the followers do their turn in combat you lump all of them into 1 group rather than individually, and combine all of their health together into one pool. All followers then use the same 3 dice rolled, acting as if they rolled those dice (though they may do different things with said dice). If the group was to take enough damage for one to die, unless it was targeted specifically, roll a dice to decide which dies.

If it would make more sense to do multiple groups, assuming your GM allows it, you may use these same rules to make multiple groups. A good example of this may be with undead vs familiars.


`;
export default markdown;
