
import { useTraits } from "../../../hooks/useTraits";
import TraitCardHolder from "./traitCardHolder";



const theBIGList = [
    {
        wantedLoneList: "hearty;|;critical;|;placeholder;|;great weapon master",
        wantedComboList: "quick runner;|;bloodhound;|;walled off;|;whirlwind;|;tag team;|;defender;|;strong punches;|;improved auras;|;guarding aura;|;dagger master;|;hammer master;|;polearm master",
        headers: ["body","Aggression","Teamwork","Defensive"],
        subNotes: ["Practice is better than theory.","Hit them hard and fast.","Traits that work better with a team than without.","Defend and Protect."],
    },
    {
        wantedLoneList: "acute memory;|;investigator;|;placeholder;|;placeholder",
        wantedComboList: "snake eyes;|;marked as lost and found;|;placeholder;|;forethought;|;longer marks;|;placeholder;|;placeholder;|;target weakness;|;placeholder;|;eggs in one basket;|;placeholder;|;placeholder",
        headers: ["mind","Dice Manipulation","Marks","___"],
        subNotes: ["Using your head to solve problems.","Change the dice to change your fate.","Applying and utilizing stacks of Marked.","___"],
    },
    {
        wantedLoneList: "telepathy;|;soul shielded;|;simple spell enhancements;|;purified soul",
        wantedComboList: "yoyo;|;soul covenant;|;familial arts;|;placeholder;|;placeholder;|;familial flock;|;placeholder;|;spell expertise;|;summoners command;|;acceleration;|;efficient spellcasting;|;placeholder",
        headers: ["soul","Movement","Spells","Summoner"],
        subNotes: ["Spellcasters and Summoners.","Positioning is key.","___","Improve your followers to improve your odds."],
    },
    
    {
        wantedLoneList: "rune maker;|;runic carver;|;arcane eyes;|;runic master",
        wantedComboList: "arcane armory;|;ingredient scavenger;|;spell book;|;runic overflow;|;complex brews;|;spell manipulator;|;runic swap;|;potent alchemy;|;spell augmenter;|;runic augmentation;|;double dosing;|;rune gate",
        headers: ["arcana","runeblade","alchemist","lore master"],
        subNotes: ["Manipulation of the world by use of magical Runes.","Enhancing yourself and your tools.","Creating and using potions.","Augmenting Arts in weird ways."],
    },
    {
        wantedLoneList: "saving face;|;jackpot;|;first impression;|;universal language",
        wantedComboList: "fancy feet;|;apprentice detective;|;ventriloquism;|;show, dont tell;|;trained detective;|;body possession;|;for the crowd;|;heart to heart;|;stolen dreams;|;the show must go on;|;master detective;|;puppet master",
        headers: ["charm","performer","detective","puppeteer"],
        subNotes: ["Talk and manipulate others.","Give people a good show, and gain buffs while doing it.","Solve crimes, even if the local guard dont like it.","Control people, figuratively and literally."],
    },
    {
        wantedLoneList: "slapdash solutions;|;crafting genius;|;explosive expert;|;build them, break them",
        wantedComboList: "apprentice blacksmith;|;turreted weapon;|;abjurer;|;reforge;|;overclock;|;spectral artillery;|;flaming blow;|;holes in the armor;|;magical craftsman;|;expert blacksmith;|;placeholder;|;wellspring of creation",
        headers: ["crafting","blacksmith","clockworks","artificer"],
        subNotes: ["Create powerful contraptions from simple parts.","Hone weapons and armor.","Use advanced gears and gyros to do impossible feats.","Magic explosions and items, what more could you ask for?"],
    },
    {
        wantedLoneList: "natures friend;|;heightened senses;|;draw roots;|;one with nature",
        wantedComboList: "nature's bind;|;hidden in the bush;|;apprentice elementalist;|;canopy;|;marked as prey;|;packmate form;|;overgrowth;|;elemental shots;|;elementalist adept;|;warden's grasp;|;master huntsman;|;dragon form",
        headers: ["nature","warden","hunter","druid"],
        subNotes: ["Work with nature to improve yourself.","Become a guardian of the forest (and your allies).","Hunt down any prey no matter how far.","Harness natures elements and become the monsters you fear most."],
    },
    {
        wantedLoneList: "field medicine;|;trained medic;|;recycled meds;|;resuscitate",
        wantedComboList: "blood magic;|;medical leaches;|;if these walls could talk;|;bloody mess;|;acupuncture;|;curse ward;|;placeholder;|;plague doctor;|;undead tinkerer;|;power from pain;|;placeholder;|;undead king",
        headers: ["medicine","blood magic","strange healers","necromancer"],
        subNotes: ["Become the doctor you always wanted to be.","Using blood for spells and effects.","There is more than one way to heal.","Stop dealth in its tracks, one way or another."],
    },
    {
        wantedLoneList: "apprentice thief;|;cat burgler;|;hidden in plain sight;|;master thief",
        wantedComboList: "bully;|;concealed item;|;apprentice spell thief;|;larceny;|;silent strike;|;spell thief;|;get rough;|;assassinate;|;obscured spell;|;double headlock;|;marked for death;|;blurred spells",
        headers: ["thieving","thug","assasin","spellthief"],
        subNotes: ["Steal and kill without a trace.","Steal peoples lunch money and get away with it.","Efficent killer.","Steal and use other peoples spells."],
    },

];



export default function TraitSimpleListing() {

    const {
        allTraits,
    } = useTraits();


    // TODO: Talk to Etan about Below
    // TODO: Do Body Mind and Soul sections
    /*
    Problems to talk to Etan With
    - Better showing between sections
    - Better clarity for connected items (links to crafting, items, spells, etc)
    - Something to draw users attention in (idk, ask Tristo Again)
    - it doesent like big names, long req, or long text
    - make the text size auto change based on size of thing
    - Text is a little small, possibly pick shorter items or maby the text size will work
    - DOES NOT WORK IN MOBLE
    - FUCK LIGHT MODE
    - doesent like being squished when the window size changes
    - replace temp defs and names for more cohesive ones
    - so many holes in traits
    */


    return (
        
        <div id="traits-simple-listing">
            {theBIGList.map((stat, i) => {
                return (
                    <TraitCardHolder key={i} allTraits={allTraits} wantedLoneList={stat.wantedLoneList} wantedComboList={stat.wantedComboList} headers={stat.headers} subNotes={stat.subNotes}/>
                );
            })}
        </div>
        

    );
}