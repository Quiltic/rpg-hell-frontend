
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Creature } from "../../client";

type Props = {
    displayedCreature: Creature;
};

export default function CreatureSheet({
    displayedCreature: displayedCreature,
}: Props) {

    return (
        <div>
            <div className="flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20 m-2" >
                {/* Name/Level/Types */}
                <div className="grid w-full grid-cols-[3fr_1fr_2fr] items-center bg-dark rounded-md justify-between">
                    <div className="text-lg font-bold capitalize p-2">
                        {displayedCreature.name ?? ""}
                    </div>
                    <div className="flex flex-row rounded-md bg-dark-400 items-center capitalize p-2 m-2">
                        Level: {displayedCreature.level}
                    </div>
                    <div className="flex flex-row items-center capitalize rounded-md bg-dark-400 p-2 m-2">
                        {displayedCreature.types}
                    </div>
                </div>

                {/* Descriptor/How Act */}
                <div className="flex flex-row italic bg-dark-400 m-2 ptlr-2">
                    {displayedCreature.descriptor}
                </div>
                <div className="flex flex-row italic bg-dark-400 pl-12">
                    {displayedCreature.how_act}
                </div>


                {/* Line */}
                <div className="flex flex-row items-center bg-dark-400 border-2 border-body-700/20 m-2"></div>

                {/* Stats */}
                <div className="flex flex-row justify-between m-1 p-1">

                    {/* Scores */}
                    <div className="grid grid-cols-3 gap-1 justify-left bg-body/10 dark:bg-dark-300 p-3 rounded-md flex-wrap ">    
                        <div className="bg-body font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                            Body: {displayedCreature.stats.body}
                        </div>
                        <div className="bg-mind font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                            Mind: {displayedCreature.stats.mind}
                        </div>
                        <div className="bg-soul font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                            Soul: {displayedCreature.stats.soul}
                        </div>
                        <div className="bg-arcana font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                            Arcana: {displayedCreature.stats.arcana}
                        </div>
                        <div className="bg-charm font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                            Charm: {displayedCreature.stats.charm}
                        </div>
                        <div className="bg-crafting font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                            Crafting: {displayedCreature.stats.crafting}
                        </div>
                        <div className="bg-medicine font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                            Medicine: {displayedCreature.stats.medicine}
                        </div>
                        <div className="bg-nature font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                            Nature: {displayedCreature.stats.nature}
                        </div>
                        <div className="bg-thieving font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                            Thieving: {displayedCreature.stats.thieving}
                        </div>
                    </div>

                    {/* HP/Shielding/Dodge/Ward */}
                    <div className="flex flex-col justify-between">
                        
                        <div className="dark:bg-dark-300 p-2 rounded-md">
                            HEALTH: {displayedCreature.health || 4*displayedCreature.stats.body+3*displayedCreature.stats.mind+2*displayedCreature.stats.soul+Math.ceil(displayedCreature.level)}
                        </div>

                        { displayedCreature.shielding > 0 &&
                        <div className="dark:bg-dark-300 p-2 rounded-md">
                            SHIELDING: {displayedCreature.shielding}
                        </div>
                        }

                        <div className="dark:bg-dark-300 p-2 rounded-md">
                            DODGE: {displayedCreature.dodge}
                        </div>
                        
                        { displayedCreature.ward > 0 &&
                            <div className="dark:bg-dark-300 p-2 rounded-md">
                                WARD: {displayedCreature.ward}
                            </div>
                        }
                    </div>

                    {/* Strain/Speed/Combat Dice */}
                    <div className="flex flex-col justify-between">
                        {displayedCreature.strain != 0 && 
                            <div className="dark:bg-dark-300 p-2 rounded-md">
                                STRAIN: {displayedCreature.strain}
                            </div>
                        }
                        {displayedCreature.strain == 0 &&
                            <div className="dark:bg-dark-300 p-2 rounded-md">
                                STRAIN: {2*displayedCreature.stats.body+3*displayedCreature.stats.mind+4*displayedCreature.stats.soul+Math.ceil(displayedCreature.level)}
                            </div>
                        }
                        
                        <div className="flex flex-col dark:bg-dark-300 p-2 rounded-md">
                            SPEED: {displayedCreature.speed}
                            
                            { displayedCreature.passives.includes("swim") &&
                            <div>Can Swim</div>
                            }
                            
                            {displayedCreature.passives.includes("climb") &&
                            <div>Can Climb</div>
                            }
                            
                            {(displayedCreature.passives.includes("flight") || displayedCreature.passives.includes("fly")) &&
                            <div>Can Fly</div>
                            }
                        </div>

                        <div className="dark:bg-dark-300 p-2 rounded-md">
                            CD: {displayedCreature.cd || 4+Math.floor(displayedCreature.level/2)}
                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-2 items-top bg-dark rounded-md justify-between">
                    {/* Active */}
                    <div className="bg-dark-400 rounded-md p-1 mr-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">ACTIVES</h3>
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                ul: ({ node, ...props }) => <ul className="md_list" {...props} />,
                            }}
                            className="text-left"
                        >
                            {displayedCreature.actives}
                        </Markdown>
                    </div>
                        
                    {/* Passive */}
                    <div className="bg-dark-400 rounded-md p-1 ml-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">PASSIVES</h3>
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                ul: ({ node, ...props }) => <ul className="md_list" {...props} />,
                            }}
                            className="text-left"
                        >
                            {displayedCreature.passives}
                        </Markdown>
                    </div>
                </div>

            </div>
        </div>
    );
}


