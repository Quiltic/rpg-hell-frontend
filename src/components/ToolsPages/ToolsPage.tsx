import { Link } from "react-router-dom";
import { Button } from "../ui/Button/Button";
import {
    bagIcon,
    creaturesIcon,
    sparklesIcon,
    ticketIcon,
    craftingIcon,
} from "../../assets/IconSVGs/heroiconsSVG";

export default function ToolsPage() {
    return (
        <>
            <h2>Tools Page</h2>

            <h3>GM Tools</h3>
            <div className="flex flex-column flex-wrap gap-4 justify-center mb-2">
                <Link to={"loot-generator"}>
                    <Button leftIcon={<>💎</>} variant="crafting">
                        Loot Table
                    </Button>
                </Link>
            </div>

            <h3>Creation Tools</h3>
            <div className="flex flex-column flex-wrap gap-4 justify-center mb-2">
                <Link to={"traits"}>
                    <Button leftIcon={ticketIcon} variant="body">
                        Traits
                    </Button>
                </Link>

                <Link to={"items"}>
                    <Button leftIcon={bagIcon} variant="mind">
                        Items
                    </Button>
                </Link>

                <Link to={"spells"}>
                    <Button leftIcon={sparklesIcon} variant="soul">
                        Spells
                    </Button>
                </Link>
                <Link to={"creatures"}>
                    <Button leftIcon={creaturesIcon} variant="medicine">
                        Creatures
                    </Button>
                </Link>
            </div>
            {/* <div className="flex flex-column flex-wrap gap-4 justify-center mb-2">
                <Link to={"wepcreator"}>
                    <Button leftIcon={craftingIcon} variant="crafting">
                        Weapon Creator
                    </Button>
                </Link>
            </div> */}
        </>
    );
}
