import { Link } from "react-router-dom";
import { Button } from "../ui/Button/Button";
import {
    bagIcon,
    creaturesIcon,
    sparklesIcon,
    ticketIcon,
} from "../../assets/IconSVGs/heroiconsSVG";

export default function ToolsPage() {
    return (
        <>
            <h2>Tools Page</h2>
            <div className="flex flex-column flex-wrap gap-4 justify-center mb-2">
                <Link to={"traits"}>
                    <Button leftIcon={ticketIcon} variant="body">
                        Update Traits
                    </Button>
                </Link>

                <Link to={"items"}>
                    <Button leftIcon={bagIcon} variant="mind">
                        Update Items
                    </Button>
                </Link>

                <Link to={"spells"}>
                    <Button leftIcon={sparklesIcon} variant="soul">
                        Update Spells
                    </Button>
                </Link>
                <Link to={"creatures"}>
                    <Button leftIcon={creaturesIcon} variant="medicine">
                        Update Creatures
                    </Button>
                </Link>
            </div>
        </>
    );
}
