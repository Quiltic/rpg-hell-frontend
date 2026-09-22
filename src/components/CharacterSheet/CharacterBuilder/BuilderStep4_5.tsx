import { playerCharacterType } from "../../../types/playerCharacterType";
import BuilderComponentStep4 from "./BuilderComponentStep4";
import BuilderComponentStep5 from "./BuilderComponentStep5";
import { Button } from "../../ui/Button/Button";
import pathJson from "../../../assets/OfflineJsons/paths.json";
import { capitalize } from "../../../util/textFormatting";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
    continueButton: () => void;
    backButton: () => void;
};

export default function BuilderStep4({
    player: player,
    setPlayer: setPlayer,
    continueButton: continueButton,
    backButton: backButton,
}: Props) {
    const path1 = pathJson.filter((path) => {
        return player.paths[0] == path.name;
    })[0].color;
    const path2 = pathJson.filter((path) => {
        return player.paths[1] == path.name;
    })[0].color;

    return (
        <div>
            {/* Top Bar */}
            <div className="m-2 flex flex-row items-center justify-center rounded-md bg-dark-400">
                Paths Chosen:
                <div className={`bg-${path1} m-2 rounded-md p-2`}>{capitalize(player.paths[0])}</div>
                <div className={`bg-${path2} m-2 rounded-md p-2`}>{capitalize(player.paths[1])}</div>
                <Button
                    variant="link-medicine"
                    className="m-2 flex items-center justify-center border-2 border-solid border-medicine-400"
                    onClick={backButton}
                >
                    Back
                </Button>
                <Button
                    disabled={player.traits.includes("") || player.arts.includes("")}
                    variant="nature"
                    className="m-2 ml-4 flex items-center justify-center"
                    onClick={continueButton}
                >
                    Continue
                </Button>
            </div>

            <BuilderComponentStep4
                player={player}
                setPlayer={setPlayer}
            />
            <BuilderComponentStep5
                player={player}
                setPlayer={setPlayer}
            />
        </div>
    );
}
