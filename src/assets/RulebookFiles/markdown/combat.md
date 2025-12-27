# Combat

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

When you are put at 0 or less health you do not immediately die. Rather, you gain stacks of Death's Door. You gain 1 stack of Death's Door by having 0 or less health at the start of your Turn, or by having negative twice your level or less health at the end of a turn.

While you have stacks of Death's Door you gain a specific ailment.
- At Death's Door 1, you have half your Speed (rounded up).
- At Death's Door 2, you are Prone and cannot get up.
- At Death's Door 3, you become unconscious, and cannot be woken up until you lose Death's Door stacks or are healed for more than half your Max Health.
- At Death's Door 4, You Die.

You lose all stacks of Death's Door at the end of a Rest.
