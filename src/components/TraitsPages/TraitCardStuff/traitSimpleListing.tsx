
import { useTraits } from "../../../hooks/useTraits";
import TraitCardHolder from "./traitCardHolder";



const theBIGList = [
    {
        wantedLoneList: "",
        wantedComboList: "battle ready;|;frenzy;|;tag team;|;bouncer;|;parkourist;|;saw it coming;|;defender;|;smother;|;whirlwind;|;MISSING TRAIT;|;melee weapon master;|;true strikes",
        headers: ["body","Aggression","Teamwork","Defensive"],
        subNotes: ["Your Body is the best tool you have.","Hit them hard and fast.","Traits that work better with a team than without.","Defend and Protect."],
    },
    {
        wantedLoneList: "",
        wantedComboList: "acute memory;|;focus fire;|;investigator;|;multitasking;|;patient;|;snake eyes;|;duelist;|;sniper;|;threat assessment;|;MISSING TRAIT;|;eggs in one basket;|;ranged weapon master",
        headers: ["mind","Dice Manipulation","Marks","___"],
        subNotes: ["Using your head to solve problems.","Change the dice to change your fate.","Applying and utilizing stacks of Marked.","___"],
    },
    {
        wantedLoneList: "",
        wantedComboList: "familiar;|;soul bound relic;|;soul covenant;|;boon infusion;|;magical knowledge;|;soul blade ;|;???;|;powered alignment;|;summoners command;|;power from within;|;purified soul;|;signature art",
        headers: ["soul","Movement","Religious","Elementalist"],
        subNotes: ["Spellcasters and Summoners.","Positioning is key.","Clerics, Paladins, and Warlocks","Manipulate the elements to your wim"],
    },
    
    {
        wantedLoneList: "",
        wantedComboList: "art manipulator;|;art token;|;arcane sense;|;split art;|;art augmenter;|;compressed arts;|;fine control;|;stacking arts",
        headers: ["arcana","runeblade","alchemist","lore master"],
        subNotes: ["Augmenting Arts in weird ways.","Enhancing yourself and your tools.","Creating and using potions.","Augmenting Arts in weird ways."],
    },
    // {
    //     wantedLoneList: "first impression;|;heart to heart;|;universal language;|;saving face",
    //     wantedComboList: "fancy feet;|;apprentice detective;|;ventriloquism;|;attentive audience;|;trained detective;|;body possession;|;for the crowd;|;holes in the armor;|;stolen dreams;|;the show must go on;|;expert detective;|;puppet master",
    //     headers: ["charm","performer","detective","puppeteer"],
    //     subNotes: ["Talk and manipulate others.","Give people a good show, and gain buffs while doing it.","Solve crimes, even if the local guard dont like it.","Control people, figuratively and literally."],
    // },
    // {
    //     wantedLoneList: "slapdash solutions;|;placeholder;|;placeholder;|;build them, break them",
    //     wantedComboList: "apprentice blacksmith;|;turreted item;|;arcane armory;|;reforge;|;steam suit;|;runic swap;|;sharpening stone;|;placeholder;|;runic flux;|;expert blacksmith;|;placeholder;|;runic overflow",
    //     headers: ["crafting","blacksmith","clockworks","artificer"],
    //     subNotes: ["Create powerful contraptions from simple parts.","Hone weapons and armor.","Use advanced gears and gyros to do impossible feats.","Magic explosions and items, what more could you ask for?"],
    // },
    // {
    //     wantedLoneList: "hidden in the bush;|;heightened senses;|;placeholder;|;one with nature",
    //     wantedComboList: "nature's bind;|;knowledge of the forest;|;plant growth;|;canopy;|;placeholder;|;placeholder;|;smothering vines;|;marked as prey;|;draw roots;|;warden's grasp;|;master huntsman;|;placeholder",
    //     headers: ["nature","warden","hunter","druid"],
    //     subNotes: ["Work with nature to improve yourself.","Become a guardian of the forest (and your allies).","Hunt down any prey no matter how far.","Harness natures elements and become the monsters you fear most."],
    // },
    // {
    //     wantedLoneList: "field medicine;|;trained medic;|;recycled meds;|;resuscitate",
    //     wantedComboList: "blood magic;|;medical leaches;|;if these walls could talk;|;bloody mess;|;quick stitch;|;soul absorption;|;bloody hand;|;plague doctor;|;undead tinkerer;|;power from pain;|;transformative surgery;|;undead king",
    //     headers: ["medicine","blood magic","strange healers","necromancer"],
    //     subNotes: ["Become the doctor you always wanted to be.","Using blood for spells and effects.","There is more than one way to heal.","Stop dealth in its tracks, one way or another."],
    // },
    // {
    //     wantedLoneList: "apprentice thief;|;cat burgler;|;hidden in plain sight;|;master thief",
    //     wantedComboList: "bully;|;marked for death;|;apprentice spell thief;|;throw out the trash;|;silent strike;|;obscured spell;|;get rough;|;placeholder;|;spell thief;|;double headlock;|;assassinate;|;blurred spells",
    //     headers: ["thieving","thug","assasin","spellthief"],
    //     subNotes: ["Steal and kill without a trace.","Steal peoples lunch money and get away with it.","Efficent killer.","Steal and use other peoples spells."],
    // },

];

const IterativeTraitLevels = [
    "Body",
    "Mind",
    "Soul",
    "Arcana",
    "Charm",
    "Crafting",
    "Medicine",
    "Nature",
    "Thieving"
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
            {IterativeTraitLevels.map((stat, i) => {
                return (
                    <TraitCardHolder key={i} shownTraits={allTraits.filter( (t) => {return (t.req?.length == 1 && t.req?.toString().includes(stat.toLowerCase()))} )} header={stat} subNotes={["stat.subNotes"]}/>
                );
            })}
            <TraitCardHolder key={30} shownTraits={allTraits.filter( (t) => {return (t.req?.length == 2)} )} header={"Mixed"} subNotes={["These Traits can only be taken at level 7 or higher."]}/>
        </div>
        

    );
}