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


## Common Actions

*These are actions every creature has access to.*

**Move** \- Spend \#; Move your SPEED. If you need to climb something, do a Body check.  
*Jumping: When you do a move you may do a standing jump up 1+(BODY/2) or long-jump 2+BODY horizontally.*

**Attack** \- Spend \#\#; Do a Weapon Attack within the weapons range. If a dice sum of 7 or less is given, gain the Attack Bonus. If a dice sum of 9 or higher is given, gain the Attack Downside.  
*Dual Welding: You may dual wield weapons if both weapons are Side Weapons. When you do, you may combine the On Hit, Bonus, and Downside of both weapons into one Attack.*

**Grapple** \- Spend \#\#; Do a Body Contest against a target within 1 tile of you. If you win, the target becomes Grappled by you.

**Push** \- Spend \#\#; Do a Body Contest against a target within 1 tile of you. If you win, the target is pushed back 1+BODY tiles away from you. (This counts as Knockback and can do Knockback damage.)

**Hide** \- Spend \#\#; Do a Thieving check, on a 9 or higher you are Hidden until you spend dice to do a non-Thieving action. (Movement does not break this.)

**Lock a Dice** \- Spend \#; Lock the dice spent. You may only ever have 1 Locked dice at a time. Locking a dice while having a Locked dice will replace the old dice with the new dice. You may later unlock that dice to spend on Arts or as a bonus dice in combat.  
	*You may only ever lock d6’s, and lose any unspent locked dice at the end of combat.*

**Activate an Art** \- Spend dice, time, and or Strain to activate the art. Art's have recommended casting requirements (See Activating Art's in the Core Rules). Your GM may be open to changing these or requiring them.

**Hunker Down** \- Spend #; Gain +1 Dodge against Ranged Attacks made against you until the beginning of your next turn.

**Overwatch** \- Reaction (Locked #); Melee Attack against a target that moves into/out of your Weapon Range. Use 3+# for sum.


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


### Going to 0 and Death's Door

When you are put at 0 or less health you do not immediately die. Rather, you gain **Bleeding Out** and stacks of **Death's Door**. When you have 0 or less life in a turn (every 10 seconds) you heal your level and gain **Bleeding Out** and a stack of **Death's Door**. While you are **Bleeding Out** at the end of your turn (or every 10 seconds) you must roll a d12. If you roll a 6 or less you gain a stack of **Death's Door**. If you roll a 7 or higher, another creature heals you, or another creature rolls a 9 or higher on a Medicine Check you lose **Bleeding Out**.

While you have stacks of Death's Door you gain a specific ailment.
- At Death's Door 1, you are permanently Slowed.
- At Death's Door 2, you become unconscious, and cannot be woken up until you lose Death's Door stacks or are healed for more than half your Max Health.
- At Death's Door 3, You Die.

You lose all stacks of Death's Door at the end of a Rest.


### Fall Damage

If you fall from more than 3 tiles up you take damage equal to how many tiles you have fallen. For example if you fell from 3 tiles you take no damage, but if you fall from 7 tiles up you would take 7 damage.



### Knockback Damage

If you are knocked back into non-destructible surface (wall) you take damage for every tile you do not move. For example; if you get knocked back 5 tiles and hit a wall after 2 tiles you take 3 damage.




## Cover
While a creature is behind something that is covering at least half of them they gain some amount of Protection.
- Half Cover \- Gain +1 Dodge against non-Area Attacks made from the other side of the cover.
- Complete Cover (a wall) \- You can't be targeted by non-Area Attacks made from the other side of the cover.




## Optional Rules

*These rules are entirely optional and may be chosen or banned by the players/gm.*


### Slower Healing/Rest

At the end of a Rest players only lose one stack of Death's Door and Exhaustion instead of all stacks.



### Popcorn Initiative

When doing combat it is popular to do a form of turn order called Popcorn Initiative. Here players and GM take turns doing turns while in combat. This is mostly done for a more dynamic and story driven combat experience.

To do Popcorn Initiative the table rolls Initiative as normal. Highest goes first. If that is a player the GM then does a NPC's turn. Otherwise if its an NPC a player may choose to go next. Players must decide themselves who will go. Once an NPC or player has gone this round they must wait until all other players and NPC's have gone to do their next turn. 



### Flanking

When you do a Melee Attack against a target that has at least one Ally on the other side of the target you gain the Attack Bonus on the Attack.