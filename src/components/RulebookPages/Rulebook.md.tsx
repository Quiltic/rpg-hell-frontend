const markdown = `

# Basics


This game is built up around the idea of normal dice (d6's, or 6 sided dice). Any and all rolls that this game will ask you to do will be done using some amount of these dice, so go grab some. Personally I would recommend 4-6 per person, though you can play this with just 1 if need be.
This game is heavily inspired by YOU the players and your host known as the Game Master (denoted as GM from here on). The GM is the one hosting the show, and while this is the rule-book, not all possible situations can be given clear ruling. Inevitably, it is up to the GM to decide what will happen. 

There are primarily 2 sections to this game: Out of Combat; which is where most role-playing will take place, and In Combat; which is where you fight monsters and other stuff.



# Locking Dice

When you do any roll you may Lock one die. This die is set to the side and is removed from the current roll, i.e. you do not add it to sums or use it for actions. 
On later turns you may then Unlock the dice putting it into your current roll. You may lock a die after using a locked dice in the current roll.
**You can NOT have more than one Locked die at a time, and you can't Lock a die out combat more than once an hour.**



# Out of Combat Rules

## Actions

These are actions that anyone can do. The basic listing of actions any creature can do is listed under their respective stat/skill down below.

Some actions require traits or items to acquire. An example is the Tunneler Trait which lets you easily break and move solid land, such as dirt or stone. Or the ever famous Cooking Tools which allow you to make foods you otherwise would have to buy to acquire.

Actions generally have 3 different ways of operating: Checks (the most common type), Contests, and Activatable ones (toggles or just works without rolling).



### Checks

When you want to do an Action that requires a check you first tell your GM what you want to do, then you roll ## (2 dice) and add the respective stat/sub-stat.
If you roll a 6 or less you Fail, a 7 through 10 is Partial Success, and an 11 or higher is a Success.
- Failure: where you just fail the action.
- Partial Success: where you do the action with a but.
- Success: where you just do the action.

You then tell your GM what you rolled and the GM will tell you what happens next.

: For example if you want to push a bolder you roll a Body check. If you have a 3 in Body then you roll 2 dice and add 3.
: Lets say you roll a 1 and a 4, you would then have 1 + 4 + 3 = 8. This is a Partial Success; so in this case your GM may say, you push the bolder, but it rolls down the hill uncontrollably.


### Taking Your Time
Certain checks innately take longer to complete than others (for example when performing physical feat climbing a wall could take longer than jumping a gap). 
These amounts of time are determined by the GM.



### Contests

Some Actions require Contests, which is a competition between two or more parties. 
When you or your GM incites a Contest, all party's then roll based on the required Stat or Skill. This being similar to the ways Checks work.
Whichever party has a higher sum wins the contest. Defenders (the ones being forced to roll) always win if a tie happens.



# Combat

Combat is split up into Rounds, each Round lasts 10 seconds and has 3 phases; Beginning which is where they take damage or effects from Stack Effects and roll their COMBAT DICE. Their Action phase which is where they can spend COMBAT DICE to do actions. Lastly their end phase, which is where they loose stacks or effects.

## Initiative

All creatures in combat must roll Initiative to see when they may do their Actions in Combat. 
This value is calculated by rolling ## (2 dice) then adding the characters Speed. Ties are decided based on the creatures base Speed (highest first). Players always win if speeds are the same.
Whichever creature has the highest Initiative goes first. Once all creatures have gone the Round is over and it goes back to being the first creatures turn.

The world and vehicles (earthquakes, neutral NPC's, carts, and other creature related actions) always go last in Initiative.



## Action Dice (AD)

At the beginning of your turn you roll an amount of dice based on your __COMBAT DICE__ (Temp name). COMBAT DICE can be calculated as 4+(lvl/2) [rounded down].
You can spend these dice to do actions in Combat. Every action asks for a different amount of dice, denoted next to the Action as a number of #. Depending on the action taken the values for the dice may or may not matter.
: For example, when you take/use the action Bull Rush it requires you to give it ##, or two dice. These dice values do not matter as you will always do its effect. On the other hand the Dagger Master trait asks for #, one dice, but requires a 6 to do its effect in combat.

Attacks and Contests count as ## (2 dice), Movement counts as # (1 dice), and Spells and Traits have varying amounts, which are listed next to them under Dice.



### Attack Dice Values Matter 

All weapons have special actions when you wield them. In order to be able to get this effect you must have the required Stat values, denoted next to the weapon. If you don't have these requirements you can still use the weapon but you only get the 4 or less effect regardless of dice values given.

On Attacks when you give ## (2 dice) you take the sum of these dice, sometimes giving special effects. Higher sums are better than lower sums. By default the high value is 9 and the low value is 4.
: For example a sword (short or long) does 1 extra damage on a 9 or higher, and 1 less damage on a 4 or lower.




## Damage and Armor

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

### Knockback and Fall Damage

When a creature falls or is knocked back, such as from a weapon with knockback, into a solid surface (wall/floor).
Creatures can fall or be knocked back 3 tiles before they take damage. If a creature falls 4 or more tiles they take damage equal to how many tiles they fell. For instance if you where to fall off a short building (3 tiles) you would be fine, however if you where to fall off a 2 story building (6 tiles), you would take 6 damage.

This is true of Knockback. If a creature would be knocked back into a solid surface 4 or more tiles they take damage equal to how much movement they cannot move. For instance if you knocked someone 8 tiles back, but they can only go 3, then they will take 5 damage (3 tiles to the wall, 5 tiles "into" the wall).




## Death's Door

When you are on 0 or less life you are put on Death's Door. While on Death's Door your have a normal Speed of 2 and every time you take damage while on Death's Door you roll a dice. If you roll equal to or less than the Death's Door value you Die, otherwise you increase Death's Door by 1.
: For example if you are on Death's Door and roll a 3 you live another turn and are on Death's Door 2.
: Another example is if you are On Death's Door 5 and roll a 2 you Die.
Death's Door only goes away if you do a Rest.


# Magic

Magic is the ability to control souls, both your own and others, to affect the world around you. Every creature, object, or place has a soul. Though typically only creatures are able to directly control souls.

As of now there are only three known ways to control souls: Strange grand movements which physically change the shape of souls, using Light to suppress or enhance souls, or through the writing of Runes on items to bring out the item's latent soul.

There are a number of ways to learn how to do magic. Some mages learn through intense study and hard work. Others learn how by tradition or special dances. Even more are born with such knowledge or even find them by sheer coincidence.

Despite all this, the manipulation of souls is not without consequence. As such, when a creature or item casts or uses magic, they may gain a number of stacks of Soul Strain based on how strong the spell they are casting is (denoted next to the spell). 
Depending on how much they have trained their Soul (points in Soul) they may start to take damage from casting. 
A creature takes an amount of damage based on how much Soul Strain they have over their Max Soul Strain. 
This damage is taken before the spell effect occurs, and the damage affects Health only which cannot be reduced. (Armor Stacks, Dodge, Ward, and other effects do not reduce this damage)
You know a number of spells equal to 2 times your Soul, and your max Soul Strain is 3 times your Soul. Though some Traits, or Items can increase these slightly. 
You loose all stacks of Soul Strain when you finish a Rest.




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


# Common Actions

## Perception/Investigation

Body is used when you are trying to see big picture things, such as a caravan on the horizon, or something out of the corner of your eye.


Mind is used when you are trying to see set things in a room, such as a hidden door in a room, or a cooked painting.


Soul is used when you are trying to see details on an object, such as a hidden compartment on a dresser, or a message in glass.



You may also roll sub-stats when GM deems it appropriate.
- Arcana for an ancient library.
- Charm for an art piece, or person.
- Crafting for a machine or component.
- Nature for a plant or creature.
- Medicine for a crime sene.
- Thieving for a shop or business.


## Body

### Physical Feats
- Long Jump 2 + Body tiles horizontally with a running start. Partial Success may be tripping on landing.
- Jump 1 + (Body/2) tiles vertically or horizontally. Partial Success may be tripping on landing.
- Lift/Push 100 x Body lb thing with 2 hands. Partial Success may be Loosing 3 speed.
- Lift/Push a 20 x Body lb thing with 1 hand. Partial Success may be Loosing 3 speed.
- Force open a door. This cannot be done quietly. Partial Success may be breaking the door off its hinges.
- Acrobatics or Athletics. Based on GM ruling.


## Mind

### Remember
Try to remember something. Partial Success may be remembering vague details.



## Soul

### Make a Prayer
(This one is a work in progress)

- 7+ Ask your god a question. Increases by 7 for every question asked that day.
- Ask for aid, may require more than 7+. (GM's discretion)
- 21+ Talk to your god.


## Arcana

### Read Runes
Read written runes. Partial success may be only being able to read half the runes.

### Investigate a magic item. 
- You learn the name of the item. (Unless on Failure)
- You know the effect, and how to activate the magic item. Partial Success may be only knowing one of these (player pick).
- Ask a more specific question based on the item.



## Charm

### Convince Someone of Something
Some creatures and situations may increase or decrease your bonus to the roll depending on GM ruling. (Such as if the target would align with what you are convincing them of.)
- Partial Success may be the creature having doubts and may ask for more (information, gold, lies).


### Performance: Sing, Tell a Story, or Tell a Joke
Most situations are based on GM ruling. However a good guideline for DL is: 1 for commoners, 3 for middle class, 5 for nobility, 7 for royalty, and 9 for gods.

- Complete Failure: Everyone boo's you and tries to get you to stop, sometimes by physical means.
- Failure: You only attract 1 or two listeners if any. 
- Success: You attract a group of people nearby to come to listen to your performance. You may get some gold from listeners.
- Great Success: Everyone who can hear your performance nearby come to listen to you, and are distracted from focusing on other tasks. You will get some gold from listeners.




## Crafting

### Make an Item
In order to craft something you need to spend half the cost of the item, and do a number of successful Crafting rolls equal to the items Crafting score.
Every time you roll to craft an item you must spend an amount of time based on the Crafting score.
- 1 minute for a Crafting score of 1 or less.
- 10 minutes for a Crafting score of 4 or less.
- 30 minutes for a Crafting score of 7 or less.
- 1 hour for a Crafting score higher than 7.

This action cannot make weapons, armors, potions, complex items, or magic items (See Tools).
- Partial Successes do not count to total Successes.



### Understand a Contraption 
- You learn the name of the contraption. (Unless on Failure)
- You know the effect, and how to activate the contraption. Partial Success may be only knowing one of these (player pick).
- Ask a more specific question based on the contraption.




## Nature

### Scrounge
Find 5 gold worth of Junk, 2 Travel Meals, or a clean water source from the local environment (if there is one).
- Partial Success may be finding the items, but they are guarded by a creature.
- Increase or Decrease the rewards based on how plentiful resources are in the area. For instance: Plentiful spots get x3 bonus resources, Good spots get x2 bonus resources, Lacking spots half resources, and Practically Nothing spots give next to nothing.



### Handle a Beast
You can either guide them, get close to them, shoo them away, have them give you something (eggs, wool, milk, something in there mouth, ect), or agitate them towards something.
Beasts with the Mount trait, may be used as Mounts on successful roll.
- Partial Success may be the creature having doubts and may ask for more (food, shinys, playing).
- Can only target a creature with the Animal tag.
- Increase the DL by the creature's Level.



### Track a Creature
If the target was Hiding or Obscured when moving, do a Nature Contest against them.
- Some creatures and situations may increase or decrease your Nature bonus depending on GM ruling (Such as weather conditions, or how long ago the tracks where made).



## Medicine
### Identify an Illness or Curse
- You learn the name of the Illness or Curse. (Unless on Failure)
- You know the effect, and how to nullify the Illness or Curse. Partial Success may be only knowing one of these (player pick).
- Ask a more specific question based on the Illness or Curse.



## Thieving

### Steal or Place an Item
If you are Hidden, do this roll normally.
If you are Obscured do this roll without your Thieving bonus.
- Partial Success may be you you taking the item but becoming detected.


### Hide
On success become Hidden.
- On Partial Success, become Obscured. If you are already Obscured become Hidden.
- Some situations may increase or decrease your Thieving bonus depending on GM ruling (Such as weather conditions, or how busy a location you are in).




# Making a Character

## Level 1

Pick a Lineage, listed below.
Then gain 2 Core Stat increases (Body, Mind, Soul), 4 Sub-Stat increases (Arcana, Crafting, Charm, Nature, Medicine, Thieving), and 3 Traits you meet the req for.

<span style="font-family: monospace; font-size: 1.3em">Health = Level + 4*Body + 3*Mind + 2*Soul</span>

<span style="font-family: monospace; font-size: 1.3em">Soul Strain = 3*Soul</span> and <span style="font-family: monospace; font-size: 1.3em">Known Spells = 2*Soul</span>. You cannot take spells that have a Soul Strain cost higher than your Level+1. 

You may take either: 2 Weapons or 1 Weapon and a Shield.

Gain an Armor, 30 gold, a Bandage, an item with the Tool tag, and two non-magical items worth 15 gold or less.



## EXP

idk


## Leveling Up!

Gain 1 Core Stat Increase, 2 Sub-Stat increases, and 1 new Trait.
No Stat or Sub-Stat can be higher than 1 plus your Level to a maximum of 6.

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



# Effects

### Grappled
- You have a Speed of 0, cant do the Move action, and can't Attack anything other than the source of the grapple. You can spend 2 dice (##) to do a Body Contest against the source of the grapple to remove this effect. 
- Does not go away until the source stops grappling you, or you escape the grapple.


### Hidden
- You cannot be seen or heard when someone is not looking for you.
- You cannot be targeted by weapon or non area spells.
- You deal 1 bonus damage on your next attack.
- Does not go away until you come out of hiding, do a non-thieving action (other than moving), take damage, or are revealed.

### Obscured
- You cannot be seen when someone is not looking for you.
- You cannot be targeted by weapon or non area spells.
- Does not go away until you come out of hiding, do an action (other than moving), take damage, or are revealed.


### Death's Door
- When you are first put on 0 or less health you are put on Death's Door. 
- While on Death's Door your have a normal Speed of 2 and every time you take damage while on 0 health you roll a dice. 
- If you roll less than the Death's Door value you Die, otherwise you increase Death's Door by 1.


### Soul Strain
- How much your Soul has been affected by casting or being affected by magic.
- You can have an amount of Soul Strain equal to three times your Soul before you start taking damage.
- When you go over your Max Soul Strain you take damage equal to how much Soul Strain you have. This damage cannot be reduced and affects Health only. (Armor Stacks, Dodge, Ward, and other effects do not reduce this damage)




# Stack Effects

All of the following effects are removed at the end of a Rest.
You gain the effects of the stacks at the beginning of your turn (or if its your turn immediately), and reduce them by 1 at the end of your turn.


### Burn
- Removes stacks of Wet before other effects.
- 1 stack of Burn removes 1 stack of Wet
- At the beginning of your turn take an amount of Damage equal to the amount of Burn you have.
- A creature can spend ## (2 dice) to put out all remaining stacks of Burn on itself or another creature.

### Wet
- Removes stacks of Burn before other effects.
- 1 stack of wet removes 1 stack of Burn.
- Wind spells do an additional 1 damage to you.
- The wording on some spells is there to remind you.

### Bleed
- At the beginning of your turn take an amount of Damage equal to the amount of Bleed you have.
- If you are healed with a bandage, medkit or other healing ITEM remove all stacks of Bleed

### Poisoned
- You do 1 less damage from Melee Weapon Attacks, and have -1 on Body rolls.
- Punches are weapon attacks.

### Stun
- At the beginning of your turn lose a number of dice equal to the amount of Stun. (do not roll these when starting your turn)
- You cannot gain stacks of Stun the turn after being affected by Stun.
- Example; If you start your turn normally rolling 5 dice but have 2 stacks of Stun you roll 3 for this turn instead.
- Unlike other stacks you loose all stacks of Stun at the end of your turn.

### Webbed
- Set your Speed to 0. You cannot do the Move action.

### Blinded
- You cannot see and fail any rolls that rely on sight. 
- You cannot attack any target that is more than 1 tile away from you.
- When you move you roll 2 dice and must get a 7 or higher otherwise you loose your remaining movement and fall over. (You don't need to roll if you move 1 tile)

### Marked
- You can't become Hidden, or Obscured.
- Some Traits and effects have special interactions with Marked.

### Invisible
- You are Hidden, and cannot be detected by direct light of sight.
- Has no effect on creatures that rely on hearing instead of sight. Such as Sand Worms.

### Flying
- You can move your Speed in any direction that isn't through walls. 
- You are immune to Rough Terrain that is on the ground.

### Incorporeal
- You can not interact with the normal world, but can still see it.
- You are able to force your way through walls and floors as if it was Rough Terrain. 
- While incorporeal you can only interact with other Incorporeal things.

### Silence
- You cannot speak, cast spells, or activate the effects of your weapon. 


# Mysc Rules

## Followers

There are many forms of Follower, familiars, summons, undead, pets, random NPC's you picked up along the way, and more.

Out of combat followers act as expected. For example undead and familiars mill about waiting for their owner to give instructions, NPC's will give input or advice, and pets will... well, be pets. 

However, when the followers do their turn in combat you lump all of them into 1 group rather than individually, and combine all of their health together into one pool. All followers then use the same 3 dice rolled, acting as if they rolled those dice (though they may do different things with said dice). If the group was to take enough damage for one to die, unless it was targeted specifically, roll a dice to decide which dies.


If it would make more sense to do multiple groups, assuming your GM allows it, you may use these same rules to make multiple groups. A good example of this may be with undead vs familiars.


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


## Rough Terrain
Some areas, spells, and effects grant or are rough terrain. When a character moves through this they must spend 2 tiles of movement for every 1 tile they wish to move.

Some examples of this are swimming, climbing, going through thick mud, or dense plant-life.


## Mounts
You can use any creature with the Mount trait as a mount. Mounting or dismounting costs 1 tile of Movement.

While mounted you may replace your speed with the Mounts speed, and when you move the mount moves with you. Mounts do not count as Followers while mounted and so do not get a turn after you.
Additionally, you may use any ability or effect the mount has while mounted. For instance if I have a dragon mount I can spend ### (3 dice) to use its Fire breath.

Creatures target you or your mount separately when doing attacks, checks, or contests.


`;
export default markdown;
