const markdown = `

# Basics

This game is built up around the idea of normal dice (d6's, or 6 sided dice). Any and all rolls that this game will ask you to do will be done using some amount of these dice, so go grab some. Personaly I would recomend 4-6 per person, though you can play this with just 1 if need be.
This game is heavily inspired by YOU the players and your host known as the Game Master (denoted as GM from here on). The GM is the one hosting the show, and while this is the rulebook not all possible situations can be given clear ruling. Enevitably it is up to the GM to decide what will happen. 

There are primarily 2 sections to this game, Out of Combat; which is where most rollplaying will take place and In Combat; which is where you fight monsters and other stuff.

# Out of Combat Rules

## Actions

### General Actions

These are actions that anyone can do.


### Trait Actions

These are actions that come from Traits, which are character/creature dependant.


## Checks

When you want to do an Action the GM may ask you to roll a Check based on some Stat or Skill you have. When they do you will need to roll a number of dice equal to 2 plus 1 for every point you put into the required check.
For example if the GM asks you roll a Body check, and you have a 3 in Body then you roll 5 dice.

The GM will then have a number of passes that you will need in order to succed at the roll you are doing. A success is any dice that is a 4 or higher.
A 6 counts as 2 successes and a 1 counts as a negitive success, yes you technicly can have negitive successes.
Once you tell your GM how many successes you have rolled they will then tell you if you passed or failed the check and what happens next.



## Contests

Some Actions require Contests, which is a compitition between to or more partys. When your GM asks you to roll a Contest you then roll a Check based on the required Stat or Skill.
Whichever person has more successes wins the contest. If a tie happens it is based on the dice values rolled. If a tie where to come from this the player wins.





# Combat

Combat is split up into Rounds, each Round a creature has 3 phases, Begining which is where they take damage or effects from Stack Effects. Next their Action phase which is where they can do their Trait or Genaric Actions. Lastly their end phase, which is where they loose stacks or effects.

## Initative

All creatures in combat must roll Initative to see when they may do their Actions in Combat. This value is calculated by rolling a dice then adding the characters Speed. Ties are decided based on the creatures base Speed (highest first).
Whichever creature has the highest speed goes first. Once all creatures have gone the Round is over and it goes back to being the first creatures turn.

## Action Points (AP)

At the begining of your turn you gain an amount of Action Points (denoted as **AP** from here on) based on your __COMBAT DICE__ (Temp name). 
You can spend AP to do actions in Combat an amount denoted next to the Action as a #, one for each point.
Attacks and Contests count as ## (2 AP), Movement counts as # (1 AP), and Spells and Traits have varing amounts.



## Damage and Armor

Damage is split up into 2 catagories Phisical and Magical. All attacks and damage will be denoted as one of these 2 types. Your chosen armor grants you half damage from its respective type.
For instance Chainmail (Medium Armor) grants half damage from all Phisical attacks.
Addiitonaly, armor grants an additional special set of Health called **Armor Health**. Diffrent armors provide a varieing amount of Armor Health. Armor Health is reduced before you take normal Health loss. Unlike normal Health Armor health cannot be regained from Healing Items or Spells.

Your Health is how much you can take before you are put on Death's Door. When you take damage you first reduce your Armor Health then your Health.

### Weapon Attacks

Melee, Bows, and Crossbows tend to do Phisical damage.
Shardguns, Soul weapons, and Spells tend to do Magical damage.

All weapons have special actions when you weild them. In order to be able to get this effect you must have the required Stat values, denoted next to the weapon. If you dont have these requirements you can still use the weapon but you do not get to roll for its effect or other effects, such as effects gained from Traits.
When you do a Weapon Attack you may roll a dice. Depending on the weapon you may get a bonus effect aside from just doing damage.



## Deaths Door

When you are on 0 or less life you are put on Death's Door. While on Death's Door your have a normal Speed of 2 and every time you take damage while on Death's Door you roll a dice. If you roll less than the Death's Door value you Die, otherwise you increase Death's Door by 1.
: For example if you are on Death's Door and roll a 3 you live another turn and are on Death's Door 2.
: Another example is if you are On Death's Door 5 and roll a 2 you Die.
Death's Door only goes away if you do a Rest.



# Stats
# Making a Character
## Level 1
## Leveling Up!

`
export default markdown;