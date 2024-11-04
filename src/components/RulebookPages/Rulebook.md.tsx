const markdown = `
# Main Rules

This game is built up around the idea of normal dice (d6's, or 6 sided dice). Any and all rolls that this game will ask you to do will be done using some amount of these dice, so go grab some. Personally I would recommend 4-6 per person, though you can play this with just 1 if need be.
This game is heavily inspired by YOU the players and your host known as the Game Master (denoted as GM from here on). The GM is the one hosting the show, and while this is the rule-book, not all possible situations can be given clear ruling. Inevitably, it is up to the GM to decide what will happen. 

## Locked Dice

You may Lock dice whenever you do a roll. That dice is removed from the current roll and placed on the side. At a later point you may unlock that dice to add it to the new roll. You may only ever have 1 dice Locked at a time, however you may Lock or Unlock as many dice in a turn as you wish.   
Some Arts require you to spend a Locked dice to activate. 

## Checks and Contests

### Checks

You may do a Check when trying to do an action. When you do roll or spend \#\# (2 dice) then add your required Stat. You may then get one of 3 outcomes; Failure, which is when you roll a 7 or less; Partial Success, which is when you roll a 8-10; or Success, which is when you roll an 11 or higher.

\\- Failure means you failed completely.  
\\- Partial Success means you passed with a “But”.   
  \\- A GM may decide what that But is.  
\\- Success means you passed completely.

For example if you want to push a boulder, you may roll Body. Let's say you roll a 2, and a 4, and have a 3 in Body, you would get 2+4+3 \= 9 for the roll, which is a Partial Success. This could mean that when pushing the boulder you push it down a hill, but you can't control where it goes.  
If you are in combat you may give two dice of set values instead of giving \#\# (2 dice) and rolling. If you do, you do not add the requested Stat. For example if you give (5,5) in combat you have a 10 for the check.

### Contests

Some situations require you to roll a Contest against another creature or target. When you do you roll two dice then add the requested Stat. Whichever party got the higher score wins the Contest. On a draw, the defender (once who is forced to roll) wins.  
If you are in combat you may give two dice of set values instead of giving \#\# (2 dice) and rolling. If you do, you do not add the requested Stat. For example if you give (5,5) in combat you have a 10 for the contest.

## Default Actions

*Common actions that people do in and out of combat.*

### Perception and Investigation

Spend \#\# (2 dice) to try to see something. This is not the same as a Search action to see hidden creatures. A GM may ask you to roll either a check based on a Main Stat (Body, Mind, or Soul) or a Substat (Arcana, Charm, Crafting, etc.). Tell the GM which you are picking.
- In general Body is used when you are trying to see big picture things, such as a caravan on the horizon, or something out of the corner of your eye.
- Mind is used when you are trying to see set things in a room, such as a hidden door in a room, or a cooked painting.
- Soul is used when you are trying to see details on an object, such as a hidden compartment on a dresser, or a message in glass.

**You may also roll sub-stats when GM deems it appropriate. Some examples follow.**
- Arcana for an ancient library.
- Charm for an art piece, or person.
- Crafting for a machine or component.
- Nature for a plant or creature.
- Medicine for a crime sene.
- Thieving for a shop or business.

### Search

- Spend \# (1 die) to look for an Obscured or Hidden creature within a number of tiles around you equal to the dice spent. So for instance if you give a 6 you will look within 6 tiles of you.  
- You will reveal any Obscured creatures before revealing Hidden creatures.

### Arts

- Spend/gain a varying amount of dice and Strain to use your Arts (Techniques, Insights, or Spells).

### Shove

- Spend \#\# (2 dice) to try to push a target within 1 tile of you. Do a Body contest against the target, on success the target is pushed back 2 tiles.

### Grapple

- Spend \#\# (2 dice) to try to grapple a target within 1 tile of you. Do a Body contest against the target, on success the target is grappled by you.

### Move

- Spend \# (1 die) to move a number of tiles up to your Speed.  
- You can only do this action 3 times per turn.

### Attack

- Spend \#\# (2 dice) to do a spell or weapon attack against a target within range.  
  - Weapons/Spells have a 9  or higher bonus  
  - Some Weapons/Spells have a 4 or lower Detriment

### Jump

- Spend \# (1 die) to do a jump. If you are standing you can jump a number of tiles equal to half your Body. On a Running jump (long jump) you may jump a number of tiles equal to your Body \+1.

### Lock a Dice

- Spend \# (1 die) to lock that dice.  
  - You may only ever have 1 Locked dice at a time.  
  - Locking a dice while having a Locked dice will replace the old dice with the new dice.  
- You may later unlock that dice to use in combat, spend on abilities, or as a bonus dice out of combat.

### Hide

- Spend \#\# to do a Thieving check. 
  - On a Partial Success, you become obscured until you attack, cast a spell, or are discoverd.
  - On a Success, you become Hidden, until you attack, cast a spell, or are discoverd.


## Combat

Combat is split up into Rounds, each Round lasts 10 seconds and has 3 phases; Beginning which is where they take damage or effects from Stack Effects and roll their COMBAT DICE. Their Action phase which is where they can spend COMBAT DICE to do actions. Lastly their end phase, which is where they loose stacks or effects.

### Initiative

All creatures in combat must roll Initiative to see when they may do their Actions in Combat. 
This value is calculated by rolling ## (2 dice) then adding the characters Speed. Ties are decided based on the creatures base Speed (highest first). Players always win if speeds are the same.
Whichever creature has the highest Initiative goes first. Once all creatures have gone the Round is over and it goes back to being the first creatures turn.

The world and vehicles (earthquakes, neutral NPC's, carts, and other creature related actions) always go last in Initiative.



### Action Dice (AD)

At the beginning of your turn you roll an amount of dice based on your __COMBAT DICE__ (Temp name). COMBAT DICE can be calculated as 4+(lvl/2) [rounded down].
You can spend these dice to do actions in Combat. Every action asks for a different amount of dice, denoted next to the Action as a number of #. Depending on the action taken the values for the dice may or may not matter.
: For example, when you take/use the action Bull Rush it requires you to give it ##, or two dice. These dice values do not matter as you will always do its effect. On the other hand the Dagger Master trait asks for #, one dice, but requires a 6 to do its effect in combat.

Attacks and Contests count as ## (2 dice), Movement counts as # (1 dice), and Spells and Traits have varying amounts, which are listed next to them under Dice.



### Attack Dice Values Matter 

All weapons have special actions when you wield them. In order to be able to get this effect you must have the required Stat values, denoted next to the weapon. If you don't have these requirements you can still use the weapon but you only get the 4 or less effect regardless of dice values given.

On Attacks when you give ## (2 dice) you take the sum of these dice, sometimes giving special effects. Higher sums are better than lower sums. By default the high value is 9 and the low value is 4.
: For example a sword (short or long) does 1 extra damage on a 9 or higher, and 1 less damage on a 4 or lower.


### Damage and Armor

Your Health is how much you can take before you are put on Death's Door, and is calculated by <span style="font-family: monospace; font-size: 1.3em">Health = Level + 4*Body + 3*Mind + 2*Soul</span>

Armors give special bonuses based on the type of armor. The most prevalent bonus is a special set of Health called **Armor Stacks**. Different armors provide a varying amount of Armor Stacks. 
Armor Stacks are reduced before you take normal Health loss. Unlike normal Health Armor Stacks cannot be regained from Healing Items or most Spells.
You can have a max of 75 Armor Stacks (Temp number) at any given point in time.
- Armor Stacks do not reduce damage from, Falling, Drowning, Armor Penetration, or excess Soul Strain.


Other armors provide **Dodge**. When you take damage while having stacks of Dodge you may choose to you may reduce the damage taken in half (rounded up) then reduce Dodge by 1.
- Dodge does not reduce damage from, Burn, Bleed, Knockback, Drowning, or excess Soul Strain.


Lastly most Soul armors provide **Ward**. When you gain stacks of Blinded, Burning, Marked, Poisoned, Silenced, Slow, Stunned, or Wet you may reduce the number of Ward you have by 1 to negate gaining the stacks.
You cannot remove stacks with ward once you have gained them.
You may only have a max of 4 Ward at any given point in time.



<span style="font-family: monospace; font-size: 1.3em">All effects from Armor are regained at the end of a Rest.</span>


### Death's Door

When you are on 0 or less life you are put on Death's Door. While on Death's Door your have a normal Speed of 2 and every time you take damage while on Death's Door you roll a dice. If you roll equal to or less than the Death's Door value you Die, otherwise you increase Death's Door by 1.
: For example if you are on Death's Door and roll a 3 you live another turn and are on Death's Door 2.
: Another example is if you are On Death's Door 5 and roll a 2 you Die.
Death's Door only goes away if you do a Rest.


# Traits

Traits are the bread and butter of FogLight. They allow you to change and manipulate not only yourself but the world around you. Every Trait is unique and allows for complex play styles to form. 

Every Trait can be associated with one or multiple of the Core Stats and Sub-stats. 
Depending on the power of a Trait they are given different requirements. They range from 1 in a Core or Sub Stat to 4 (the maximum a Stat can be).
Additionally, depending on what Stat they associate with, they have a specific theme. These rough themes are listed below. However keep in mind any Trait does not necessarily have to stick to that theme if a character would work well with it.

A full listing of Traits is listed under Traits Tables, or in the table page given in the header.

***Every level you acquire a new Trait. You must have the requirements to take the selected Trait.***

# Arts and Strain

Arts are special uses of your Body, Mind, and Soul. Using an Art can change the way an encounter pans out, sometimes significantly. When you use an Art you are forcefully manipulating your Body, Mind, or Soul in a way which it was not meant to move. 
This is where Strain comes from, as the manipulation of Arts is not without consequence. As such, when a creature or item casts or uses Arts, they may gain an amount Strain based on how strong the Art they are activated is (denoted next to the Art). 
Depending on how much they have trained their Core Stats they may start to take damage from activating an Art. 
A creature takes an amount of damage based on how much Strain they have over their Max Strain. 
This damage is taken before the Art's effect occurs, and the damage affects Health only which cannot be reduced. (Armor Stacks, Dodge, Ward, and other effects do not reduce this damage)
You know a number of different Arts equal to 2 times your their respective Stat, and your ***Max Strain is equal to 2x Body + 3x Mind + 4x Soul***. Though some Traits, or Items can increase these slightly. 
You loose all stacks of Strain when you finish a Rest.


## Techniques

The physical moves that tolls a Body. These can be extremely simple, such as giving a Speed boost, to something as complicated as an Aura. 
***You know a number of Techniques equal to 2x Body. Techniques can only be changed out during a Levelup.***

## Insights

The mental manipulation that stretches a Mind. These tend to effect dice values, or how one sees a scene. 
***You know a number of Insights equal to 2x Mind. Insights can only be changed out during a Levelup.***

## Spells and Magic

Magic is the ability to control souls, both your own and others, to affect the world around you. Every creature, object, or place has a soul. Though typically only creatures are able to directly control souls.
As of now there are only three known ways to control souls: Strange grand movements which physically change the shape of souls, using Light to suppress or enhance souls, or through the writing of Runes on items to bring out the item's latent soul.
There are a number of ways to learn how to do magic. Some mages learn through intense study and hard work. Others learn how by tradition or special dances. Even more are born with such knowledge or even find them by sheer coincidence.

***You know a number of Spells equal to 2x Soul. Unlike other Arts, Spells can be changed out after the end of a Rest.***





# Rest and Travel
## Rest

When you spend 8 or more hours doing non-extraneous effort, such as sleeping or relaxing, you gain the effects of a Rest. 
Rests do not need to be completed all at once, and can be broken up into multiple segments of at least 2 hour increments. 
However, you can only Rest up to twice a Day.
You must Sleep for at least 6 hours every day. This time is apart of a rest.


When you complete a Rest you gain the following bonuses:
- You fully heal, and regain all Armor effects such as Armor Stacks, Dodge, and Ward.
- You loose all non permanent Stack Effects, such as Wet or Soul Strain (these are just 2 examples. See Stack Effects for more).
- You regain all uses of spent Trait effects. (Some traits will say "You can do this a number of times per Rest")
- You loose all Stacks of Death's Door



## Travel

When moving long distances you move based on the average of all party member's Speed (rounded down). For example if a party has 3 people with speeds of 7,6,4 then the travel speed is 5.

Large grid is used when dealing with travel. A large tile is 2,160x2,160 tiles. Medium tiles are 36x36 tiles (can be used to move per minute). __If your using hex like a chad then its the same but in hex shape.__
Every Hour your party can move a number of Large tiles equal to your Party Travel Speed, mentioned above. 
Alternatively, your party can move 1 tile faster at the cost of being permanently Marked for the duration of travel. This condition lasts into combat if you get ambushed.
Or your party can move 1 tile slower to try to Hide during travel. You can roll Nature or Thieving for this check.

When using Boats, Riding Animals, Carts, Cars, or some similar vehicle you replace your speed with that of the vehicle.

How to handle events during travel. First decide a destination and route. Count the number of tiles it would take to get there. You then may make a number of events based on how far they travel and how fast they move. 
A good method for this is dividing the distance by the party speed, or by deciding a set number of events to give. 
Events can be classified as combat, exploration, roleplay, or location based events.
 - Combat is... well combat. A good example is having the party get ambushed by bandits, or finding a pack of wolfs.
 - Exploration is any unmarked location (or generally named location; such as the Plains of Vorg) that you may add flavor or checks to. A good example would be a breaking bridge over a chasm, or a "shortcut" through a cave.
 - Roleplay may be meeting new people or having the party sit by the campfire telling stories. This may lead to combat or will just be something for the party to experience. A good example would be finding a traveling circus.
 - Locations are any major, or minor, places that are marked on a map. This can be a known town, ancient ruin, or some other marked location on the map.



# Stats

## Basic Stats

### Health

- How much Damage you can take before going on Death’s Door.   
- Equals **4xBody \+ 3xMind \+ 2xSoul \+ Your Level**

### Armor

- How much Damage you take before losing Health  
- Dependant on Armor  
  - Heavy armor typically gives 4xBody \+ 3xMind \+ Your Level Armor   
  - Medium armor typically gives 2xBody \+ 2xMind \+ Your Level Armor   
  - Light armor typically gives Dodge Stacks and Your Level Armor   
  - Clothing typically does not give Armor

### Max Strain

- How much Strain you are able to gain before you take Strain damage.  
  - When you have more Strain then your Max Strain you take health damage equal to how much extra Strain you have.  
  - For example if your Max is 5 and you have 7 Strain you take 2 damage  
- Equals **2xBody \+ 3xMind \+ 4xSoul**

### Speed

- How many tiles you move when you do the Move action.  
- The bonus you add to Initiative for combat  
- Based on Traits and Armor worn  
  - Heavy typically gives \-2.  
  - Medium typically gives \-1.  
  - Light typically has no impact.  
  - Clothing typically gives \+1.

## Main Stats

### Body

- A Main Stat.  
- Used for physical actions, such as pushing, pulling, or lifting.

### Mind

- A Main Stat.  
- Used when talking about mental actions, such as remembering something, doing puzzles, or discovering new things.

### Soul

- A Main Stat.  
- Used when dealing with magic, arts, religion, or wisdom based rolls.

## Sub Stats

### Arcana

- A Sub-Stat.  
- Used when dealing with magic items, runes, older languages, or potions.

### Charm

- A Sub-Stat.  
- Used when interacting with other characters. Such as for intimidation or diplomacy.

### Crafting

- A Sub-Stat.  
- Used when crafting new items (see Crafting Items), identifying non-magical items, or using complex items (such as an airship or crane).

### Medicine

- A Sub-Stat.  
- Used for healing others or investigating strange illnesses or poisons.

### Nature

- A Sub-Stat.  
- Used for tracking, identifying natural things, or for gathering/scavaging.

### Thieving

- A Sub-Stat.  
- Used when trying to break the law. Such as pickpocketing, stealing, or being sneaky.


# Making a Character

## Level 1

Pick a Lineage, listed below.
Then gain 2 Core Stat increases (Body, Mind, Soul), 4 Sub-Stat increases (Arcana, Crafting, Charm, Nature, Medicine, Thieving), and 3 Traits you meet the requirements for.

<span style="font-family: monospace; font-size: 1.3em">Health = Level + 4*Body + 3*Mind + 2*Soul</span>

<span style="font-family: monospace; font-size: 1.3em">Strain = Body + 2*Mind + 3*Soul</span> and <span style="font-family: monospace; font-size: 1.3em">You may know a number of Techniques (Body), Insights (Mind), or Spells (Soul) equal to twice their respective stat</span>. You cannot take Techniques, Insights, or Spells that have a Strain cost higher than your Level+1. 

You may take either: 2 Weapons or 1 Weapon and a Shield.

Gain an Armor, 30 gold, a Bandage, an item with the Tool tag, and two non-magical items worth ___ gold or less.



## EXP

idk


## Leveling Up!

Every level gain 1 new Trait that you meet its requirements for.
Every odd level gain +1 to a Main-Stat, +2 to a Sub-Stat or +1 to two different Sub-Stats, and gain 2 new Techniques (Body), Insights (Mind), or Spells (Soul) based on which Main-stat you increased. 
**No Main or Sub Stat can be higher than 4.**

<span style="font-family: monospace; font-size: 1.3em">Remember to update Health, Armor and Strain</span>


## Useful Level Table
| Level | Main/Sub Stat Increases | Total Stat Increases | # of Traits | Combat Dice |
| --- | --- | --- | --- | --- |
| 1 | +2/+4 | 2/4 | 3 | 4 |
| 2 | - | 2/4 | 4 | 5 |
| 3 | +1/+2 | 3/6 | 5 | 5 |
| 4 | - | 3/6 | 6 | 6 |
| 5 | +1/+2 | 4/8 | 7 | 6 |
| 6 | - | 4/8 | 8 | 7 |
| 7 | +1/+2 | 5/10 | 9 | 7 |
| 8 | - | 5/10 | 10 | 8 |
| 9 | +1/+2 | 6/12 | 11 | 8 |
| 10 | - | 6/12 | 12 | 9 |

## Lineage Table
| Rolls | Lineage Type | Bonus Trait |
| --- | --- | --- |
| 1,1 | Generic Humanoid | Pick an extra Skill that doesn't require more than 1 in a Base Stat (Body, Mind, Soul), you must still meet it's requirement. |
| 1,2 | Undergrounder | You learn the spell Glow, and you can cast Fog Light once per Rest without gaining Soul Strain. These spells do not count against the number of known spells you may have. Additionally, you are small, and are able to squeeze into places you normally wouldn't. You act as half your size smaller when trying to get through or into a space you wouldn't fit in otherwise.|
| 1,3 | Aquatic | You can breath underwater without needing air, and you can swim your Speed. |
| 1,4 | Avian | You are able to glide 2 tiles for every 1 tile you fall. This effect does not work if your arms are hindered in any way (Being Grappled, caring something, ext.) |
| 1,5 | Beastkin | Increase your Speed by 1. |
| 1,6 | Draconic | When you lock a dice, increase its value by 1. This cannot increase a 6. |
| 2,1 | Naga-kin | When you grapple a creature within 1 tile of you, you may Bite them (no cost) to give them Poisoned for a number of turns equal to your Level. Additionally, you gain an extra dice when trying to Identify an Illness or Curse. |
| 2,2 | Seeker | You are mostly blind, only able to see things up to 2 tiles away. To counteract this you are able to see the Souls of living things up to 12 tiles away so long as they are not obstructed by solid objects such as walls. Additionally, you know the Spell 'Detect Magic'. This does not count against the number of known spells you may have. |
| 2,3 | Nymph-born | You are able to have simple conversations with creatures that have the Animal Tag. Additionally, you know the Spell 'Control Elements'. This does not count against the number of known spells you may have. |
| 2,4 | Hell-born | After taking damage from Burn reduce it by 2 instead of 1. Additionally, you know the Spell 'Firebolt'. This does not count against the number of known spells you may have. |
| 2,5 | Light-born | Heal 1 more whenever you would Heal. You can cast Glow at will. This spell does not count against the number of known spells you may have. |
| 2,6 | Constructed | Gain your Level additional Armor Stacks at the end of a Rest. Additionally, you may consume inorganic material as a food source. |


# Status Effects

## Duration Effects

*Things that may change how you play. May have a duration when applied.*

### Focus

- You are concentrating on an Art over a ‘long’ period of time.  
- You lose Focus when you gain any amount of Stun, gain stacks of or are put on Death’s Door, or through specific Arts such as the spell ‘Daydream’.

### Windup

- Similar to focus except you are preparing to do something next turn.  
- You lose Windup when you gain any amount of Stun, gain stacks of or are put on Death’s Door, or through specific Arts such as the spell ‘Daydream’.

### Prone

- You cannot be attacked by ranged attacks that have a sum of 8 or less.  
- You cannot do attacks unless you give a 9 or higher on the attack.  
- You must give \# before you may do the Move action. This counts as a Move action.  
- You must give \# to go prone. This counts as a Move action.

### Grappled

- You cannot target anything other than the thing grappling you.  
- You may give \#\# to do a Body contest against the target grappling you. On success, you are no longer Grappled.  
  - Some Spells or Traits let/force you to roll other stats in the contest instead of Body.

### Obscured

- You cannot be targeted by ranged actions.  
  - Attacks, spells, effects, etc.  
- You cannot be detected while people are not looking for you.

### Hidden

- You cannot be targeted by ranged actions.  
  - Attacks, spells, effects, etc.  
- You cannot be detected while people are not looking for you.  
- When a creature does a Search action you are only found if no other creatures are Obscured in the same Search.  
- You do \+1 damage on the attack action, this removes Hidden.

### Marked

- Attack sums against you have +1 to the total value.
- Some Traits and Arts do apply deferent effects to Marked targets.

### Hover

- You float off the ground. You are immune to ground effects, such as Rough Terrain, or traps, and you cannot become Prone.

### Flying

- You can move your Speed in the Air.

### Silenced

- You cannot Speak, activate Arts, or give dice to Traits.

### Light Headed

- You cannot activate Windup or Focus abilities or Arts.  
- If you are Winding up or Focusing on something you drop the Windup/Focus.

### Invisible

- You cannot gain stacks of Marked, and lose any you have when becoming Invisible.  
- You are permanently Obscured.  
- You cannot be found when someone Searches unless you are within 2 tiles of them.  
- You cannot be seen by anything except through magic.

### Incorporeal

- You can not interact with the normal world, but can still see it.  
- You cannot do or take damage from non-magical sources.  
  - You can take/do non-magical damage from/to other incorporeal things.  
- You are able to force your way through walls and floors as if it was Rough Terrain.  
- While incorporeal you can only interact with other Incorporeal things.  
- You do not leave traces, and cannot be tracked.

### Blind

- You cannot see, failing any roll that requires sight.  
- You cannot target anything unless you Search First.  
- You cannot do attacks that have a sum of 8 or less.  
- Reduce by 1 at the end of your Turn.

### Poisoned

- You do 1 less damage from weapon or spell attacks.
- You have -1 on all Body rolls.

### Sparking
- You take 1 damage for every one (dice value of 1) you roll, unlock, or generate.
- This effect can happen multiple times per roll, and goes off on ALL rolls.


### Glowing

- You cannot become Obscured except by solid objects such as walls.  
- You cannot become Invisible or Hidden.  
- Reduce by 1 at the end of your Turn.


## Stack Effects

*Effects that are based on the amount of stacks you have.*

### Burn

- Take damage at the start of your turn for every stack of Burn  
- Spend \#\# to remove all stacks of Burn  
- Reduce by 1 at the end of your Turn.

### Bleed

- Take damage at the start of turn for every stack of Bleed.  
- Remove all stacks of Bleed when you are Healed  
- Reduce by 1 at the end of your Turn.

### Stun

- Roll less dice at the start of your turn for every stack of Stun.  
- You cannot gain Stun the turn after you are affected by Stun  
- Remove all stacks at the end of your turn.



### Slow

- Reduce your Speed by the amount of Slow you have.  
- Remove all stacks at the end of your turn.

### Wet

- Removes or Prevents having/gaining stacks of Burn equal to the amount of wet  
  - 1 Wet prevents 1 Burn  
- Some Spells and Traits do special effects off of Wet Stacks  
- Reduce by 1 at the end of your Turn.


### Death's Door

- When you take damage, roll a Dice. If you roll equal to or less than the number of Death's Door stacks you have You die. Otherwise increase Death's Door by 1\.  
- Your default Speed is set to 3 unless it is Lower.  
- Remove all stacks of Death’s Door when you Rest.



# Mysc Rules

## Followers

There are many forms of Follower, familiars, summons, undead, pets, random NPC's you picked up along the way, and more.

Out of combat followers act as expected. For example undead and familiars mill about waiting for their owner to give instructions, NPC's will give input or advice, and pets will... well, be pets. 

However, when the followers do their turn in combat you lump all of them into 1 group rather than individually, and combine all of their health together into one pool. All followers then use the same 3 dice rolled, acting as if they rolled those dice (though they may do different things with said dice). If the group was to take enough damage for one to die, unless it was targeted specifically, roll a dice to decide which dies.


If it would make more sense to do multiple groups, assuming your GM allows it, you may use these same rules to make multiple groups. A good example of this may be with undead vs familiars.


## Crafting Items

In order to craft something you need to spend half the cost of the item, and do a number of successful Crafting rolls equal to the item's Crafting score. Every time you roll to craft an item you must spend an amount of time based on the rarity of the item (listed below). Only a Success counts when making items, Partial Successes do not increase how far along the item is made.  

A default crafting roll cannot make weapons, armors, alchemical items (such as potions), complex items, runes, or magic items. For that you will need to own a set of specialized Tools. However, once you have these Tools you can begin to craft one of these items.
To craft weapons and armors you need a suficent heat source (GM dependent) and a set of Smithing tools.
To craft potions or other alchemical items you need a set of Alchemist tools. Alchemical items, such as potions, can be crafted using Arcana, or Crafting rather than just Crafting. Similarly, Medicine items, such as a bandage, can be crafted using Medicine or Crafting.
To craft complex items you need a set of Tinkers tools.
Lastly to craft runes and magic items you need a set of Runecarvers tools.

	1 minute for a common item.  
	10 minutes for an uncommon item.  
	1 hour for a rare item.  
	1 day for a legendary item.

## Knockback and Fall Damage

When a creature falls or is knocked back, such as from a weapon with knockback, into a solid surface (wall/floor).
Creatures can fall or be knocked back 3 tiles before they take damage. If a creature falls 4 or more tiles they take damage equal to how many tiles they fell. For instance if you where to fall off a short building (3 tiles) you would be fine, however if you where to fall off a 2 story building (6 tiles), you would take 6 damage.

This is true of Knockback. If a creature would be knocked back into a solid surface 4 or more tiles they take damage equal to how much movement they cannot move. For instance if you knocked someone 8 tiles back, but they can only go 3, then they will take 5 damage (3 tiles to the wall, 5 tiles "into" the wall).

## Rough Terrain
Some areas, spells, and effects grant or are rough terrain. When a character moves through this they must spend 2 tiles of movement for every 1 tile they wish to move.

Some examples of this are swimming, climbing, going through thick mud, or dense plant-life.


## Mounts and Vehicles
You can use any creature with the Mount trait as a mount. Mounting or dismounting costs a movement # (1 Movement dice).

While mounted you may replace your speed with the Mounts/Vehicle speed, and when you move the Mount/Vehicle moves with you. Mounts do not count as Followers while mounted and so do not get a turn after you.
Additionally, you may use any ability or effect the Mount/Vehicle has while mounted. For instance if I have a dragon mount I can spend ### (3 dice) to use its Fire breath.

Creatures target you or your Mount/Vehicle separately when doing attacks, checks, or contests.


## Weather Conditions
Weather conditions are effects the GM may give to a particular area to give special effects to it. These are a few of the most common effects that may occur. Your GM may have more weather conditions that are not on this list.

Every Weather Condition, excluding Clear, has 3 types to it, Heavy, Medium, and Light.

### Clear
No special effects are present.

### Snowfall
- Blizzard (Heavy) - All Terrain is Rough Terrain if not in shelter. All creatures gain 2 stacks of Stun at the end of their turn if in the Blizzard.
- Snow Storm (Medium) - All water turns to ice and becomes Rough Terrain if not in shelter. All creatures gain 1 stack of Stun at the end of their turn if in the Storm.
- Light Snowfall (Light) - All water turns to ice and becomes Rough Terrain if not in shelter.

### Rain
- Torrential Rain (Heavy) - Everything gains 1 stack of Blind, and 5 stacks of Wet at the end of their turn if in the Torrential Rain.
- Rainfall (Medium) - Everything gains 3 stacks of Wet at the end of their turn if in the Rain.
- Light Rain (Light) - Everything gains 1 stack of Wet at the end of their turn if in the Rain.

### Winds
- Tornado (Heavy) - A Tornado rips across the land. It moves 8 tiles in a random direction and is 5 tiles wide. Anything that is within its area when it moves is thrown 12 tiles away from the Tornado. 
- Sand/Dust Storm (Medium) - All creatures gain 1 stack of Blind at the end of their turn if in the Storm.
- High Winds (Light) - All attacks are reduced by 1, to a minimum of 1 if in the winds.

### Sun
- Overbearing Heat (Heavy) - All Terrain is Rough Terrain if not in shelter. All creatures loose 5 stacks of Wet at the end of their turn if in the Sun.
- Rainfall (Medium) - All creatures loose 3 stacks of Wet at the end of their turn if in the Sun.
- Light Rain (Light) - All creatures loose 1 stack of Wet at the end of their turn if in the Sun.




# Item Tags

*These are the tags you will commonly see on items.*

## Weapon Tags

### Range

- How many tiles away the item will affect.  
- Weapons can target anything within this range.

### Throw Range

- How far you can throw the item.

### Damage

- How much damage weapons do when they hit the target.

### Auto-loading

- Fully reloads at the end of your turn.

### Two Handed

- Requires two hands to be able to use.

### Loading

- How many times the item can be used before requiring you to spend \# (1 die) to reload.

### Glow

- Can be activated with \# (1 die) to light up everything within 4 tiles.   
- Items with Glow can be used to cast Spells.

### Launcher

- Can be used to launch small items a number of tiles equal to its Range.

## Armor Tags

### Speed

- ### How much Speed you gain/lose when equipping the item.

### Dodge

- Can be spent when taking damage to reduce damage by half (rounded up).  
- Gained at the end of a Rest

### Ward

- When you gain stacks of: Blinded, Burning, Marked, Poisoned, Silenced, Slow, Stunned, or Wet; you may choose to not gain these stacks and reduce your Ward by 1\.  
- Gained at the end of a Rest.

### Heavy Armor

- The type/amount of armor you get at the end of a Rest.  
- Gives 4xBody \+ 3xMind \+ Your Level 

### Medium Armor

- The type/amount of armor you get at the end of a Rest.  
- Gives 2xBody \+ 2xMind \+ Your Level 

### Light Armor

- The type/amount of armor you get at the end of a Rest.  
- Gives Dodge and Your Level Armor

### Clothing

- The type/amount of armor you get at the end of a Rest.  
- Gives Dodge and Ward

# GM Advice

*This section is for new GM’s who have never been a GM in any game or have never been a GM for this game.*

## Out of Combat

*Common things you may want to do when out of combat.*

### Partial Success

When a player rolls a 8-10 on any check it is called a Partial Success. Typically you should have the player succeed at whatever they are doing, however give a but. For example; When trying to quietly lockpick a door, have them unlock the door, but its hinges are squeaky and the noise emanates throughout the area.  
You can be as aggressive or passive about the But’s as you like. However, always have some negative things happen from the roll. Even if that negative thing is remembering just a fragment of info instead of the entire thing, it makes play more interesting for both YOU the GM and your players.

## Perception/Investigation

Typically there are 3 scopes of Perception/Investigation; Broad Scope (seeing something far away, or getting a bigger picture of an area), Local Scope (seeing a specific item in a cluttered room), and Close Scope (seeing a fingerprint on a mug, or a mistyped word on a page). It is good to split up perception/investigation rolls into these 3 scopes, as it lets you pick Body (Broad), Mind (Local), or Soul (Close) for which Main Stat to roll.   
It is also recommended offering a Sub-Stat option whenever doing a roll. For example if you are looking for a tower in a forest, a Body roll would work, but so would Nature. Alternatively, if you are looking at how someone died in a room, you could do Mind for the room, or Medicine to check the body. 

## Combat

### On Deck

When doing Turns for players it is a good idea to tell a player “You're on deck.” Which means that they are next in initiative. This lets players tune back into combat or prepare to do their turn, either by rolling their dice or by making a plan.

### Enemies

The game is designed to have enemies be scaled on level equal to a characters level. This means that a level 1 creature is "equivalent" to a level 1 player, while a level 6 creature is comparable to a level 6 player. 
Using this setting up combat based on creature level should be as strait forward as taking your parties total levels and making it as similar to the enemies total levels. Being within 1 level is recommended.
For instance if you have 4 party members of level 2, then their total levels would be 8 (4*2). If you wanted them to then fight 'Silverback Wolfs' (each at level 3) them you may want to have the party fight 3 of them (9 total level for the wolfs).
This should be a slightly difficult fight for the players, but still manageable.

It is recommended to make enemies have intertwined initiative amongst the players, that way you dont have the players doing one big turn and then the enemies doing one big turn. This will force you to fudge some numbers but it does have an overall more interesting turn order.  
Armor Broken, and Bloody enemies are good to help give your players a sense of how much damage they have done to the enemies. Armor Broken is when the target no longer has any Armor and is taking health damage. While Bloody is good for when the Enemy is on its last legs (typically 25% or less health).

### Making Enemies

Since this game is still in progress of being built, you may run into an issue of not having a creature you want to use. The best way I have found to make creatures is to first have an idea of what kind of creature you want to make. Then to make the creature set it to an appropriate level. If you are making the creature to fight a party then it is best to make it the same level or 1 less than the party. From there  
BEST STEPS TO MAKE CREATURE

* Determine type/idea  
  * Cow \= animial  
  * Ghost \= arcana soul  
* Determine wanted level  
  * If fighting party make it \= or \-1 level of the party  
* Do stats as normal  
* Pick 3 traits, maby more if needed.  
  * Ignore requirements if it makes sense.  
* Pick 3-4 Arts  
  * Too many arts will confuse you (GM) so keep it strong but simple  
  * Pick arts that give stacks and or arts that change the way the players will have to work  
    * For instance a monster that resurrects zombies (lich) makes combat more interesting and unique  
* Fudge the numbers  
  * For instance if you want a fast but tanky enemy give them some speed (from nowhere)  
* Yep…


`;
export default markdown;
