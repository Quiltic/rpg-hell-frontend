
import { useTraits } from "../../../hooks/useTraits";
import TraitCardHolder from "./traitCardHolder";



const theBIGList = [
    {
        wantedLoneList: "",
        wantedComboList: "criminal;|;aquatic;|;constructed;|;child of faith;|;cloudhopper;|;cursed;|;undergrounder;|;merchant house;|;elemental;|;warriors of old;|;nomad;|;nature born",
        headers: ["Origin","Flexible","Middle Grounder", "Eye Catchers"],
        subNotes: ["Your Origin Stat is Body, Mind, or Soul. You pick your Origin Stat when you make the character.","Common ones with a lot of room for change.","More specific, but still flexible","For those with very specific origins."],
    },
    {
        wantedLoneList: "hearty;|;battle ready;|;critical;|;great weapon master",
        wantedComboList: "quick runner;|;bloodhound;|;walled off;|;whirlwind;|;tag team;|;defender;|;strong punches;|;improved auras;|;guarding aura;|;dagger master;|;hammer master;|;polearm master",
        headers: ["body","Aggression","Teamwork","Defensive"],
        subNotes: ["Practice is better than theory.","Hit them hard and fast.","Traits that work better with a team than without.","Defend and Protect."],
    },
    {
        wantedLoneList: "snake eyes;|;forethought;|;placeholder;|;eggs in one basket",
        wantedComboList: "acute memory;|;marked as lost and found;|;weak spot;|;investigator;|;longer marks;|;placeholder;|;placeholder;|;target weakness;|;duelist;|;placeholder;|;placeholder;|;placeholder",
        headers: ["mind","Dice Manipulation","Marks","___"],
        subNotes: ["Using your head to solve problems.","Change the dice to change your fate.","Applying and utilizing stacks of Marked.","___"],
    },
    {
        wantedLoneList: "telepathy;|;soul shielded;|;simple spell enhancements;|;efficient spellcasting",
        wantedComboList: "yoyo;|;soul covenant;|;apprentice elementalist;|;placeholder;|;placeholder;|;placeholder;|;placeholder;|;placeholder;|;elementalist adept;|;acceleration;|;purified soul;|;updraft",
        headers: ["soul","Movement","Religious","Elementalist"],
        subNotes: ["Spellcasters and Summoners.","Positioning is key.","Clerics, Paladins, and Warlocks","Manipulate the elements to your wim"],
    },
    
    {
        wantedLoneList: "rune maker;|;arcane eyes;|;runic carver;|;runic master",
        wantedComboList: "arcane armory;|;ingredient scavenger;|;spell book;|;runic swap;|;complex brews;|;spell manipulator;|;runic flux;|;potent alchemy;|;spell expertise;|;runic overflow;|;double dosing;|;spell augmenter",
        headers: ["arcana","runeblade","alchemist","lore master"],
        subNotes: ["Manipulation of the world by use of magical Runes.","Enhancing yourself and your tools.","Creating and using potions.","Augmenting Arts in weird ways."],
    },
    {
        wantedLoneList: "first impression;|;heart to heart;|;universal language;|;saving face",
        wantedComboList: "fancy feet;|;apprentice detective;|;ventriloquism;|;show, dont tell;|;trained detective;|;body possession;|;for the crowd;|;holes in the armor;|;stolen dreams;|;the show must go on;|;expert detective;|;puppet master",
        headers: ["charm","performer","detective","puppeteer"],
        subNotes: ["Talk and manipulate others.","Give people a good show, and gain buffs while doing it.","Solve crimes, even if the local guard dont like it.","Control people, figuratively and literally."],
    },
    {
        wantedLoneList: "slapdash solutions;|;placeholder;|;placeholder;|;build them, break them",
        wantedComboList: "apprentice blacksmith;|;turreted item;|;spectral artillery;|;reforge;|;steam power;|;fractal creations;|;placeholder;|;placeholder;|;abjurer;|;expert blacksmith;|;placeholder;|;wellspring of creation",
        headers: ["crafting","blacksmith","clockworks","artificer"],
        subNotes: ["Create powerful contraptions from simple parts.","Hone weapons and armor.","Use advanced gears and gyros to do impossible feats.","Magic explosions and items, what more could you ask for?"],
    },
    {
        wantedLoneList: "hidden in the bush;|;heightened senses;|;placeholder;|;one with nature",
        wantedComboList: "nature's bind;|;knowledge of the forest;|;plant growth;|;canopy;|;placeholder;|;placeholder;|;smothering vines;|;marked as prey;|;draw roots;|;warden's grasp;|;master huntsman;|;placeholder",
        headers: ["nature","warden","hunter","druid"],
        subNotes: ["Work with nature to improve yourself.","Become a guardian of the forest (and your allies).","Hunt down any prey no matter how far.","Harness natures elements and become the monsters you fear most."],
    },
    {
        wantedLoneList: "field medicine;|;trained medic;|;recycled meds;|;resuscitate",
        wantedComboList: "blood magic;|;medical leaches;|;if these walls could talk;|;bloody mess;|;quick stitch;|;soul absorption;|;bloody hand;|;plague doctor;|;undead tinkerer;|;power from pain;|;transformative surgery;|;undead king",
        headers: ["medicine","blood magic","strange healers","necromancer"],
        subNotes: ["Become the doctor you always wanted to be.","Using blood for spells and effects.","There is more than one way to heal.","Stop dealth in its tracks, one way or another."],
    },
    {
        wantedLoneList: "apprentice thief;|;cat burgler;|;hidden in plain sight;|;master thief",
        wantedComboList: "bully;|;marked for death;|;apprentice spell thief;|;double headlock;|;silent strike;|;obscured spell;|;get rough;|;placeholder;|;spell thief;|;larceny;|;assassinate;|;blurred spells",
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