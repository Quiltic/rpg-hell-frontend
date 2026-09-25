import { playerCharacterType } from "../../../types/playerCharacterType";
import { Button } from "../../ui/Button/Button";
import { capitalize } from "../../../util/textFormatting";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
    continueButton: () => void;
    backButton: () => void;
};

export default function BuilderStep_Name_Stories({
    player: player,
    setPlayer: setPlayer,
    continueButton: continueButton,
    backButton: backButton,
}: Props) {
    return (
        <div>
            {/* Top Bar */}
            <div className="m-2 flex flex-row items-center justify-center rounded-md bg-dark-400">
                <Button
                    variant="link-medicine"
                    className="m-2 flex items-center justify-center border-2 border-solid border-medicine-400"
                    onClick={backButton}
                >
                    Back
                </Button>
                <Button
                    disabled={player.name == ""}
                    variant="nature"
                    className="m-2 ml-4 flex items-center justify-center"
                    onClick={continueButton}
                >
                    Continue
                </Button>
            </div>

            <div className="m-2 bg-dark-400 p-2">
                <h1 className="m-2 rounded-md bg-dark-300 p-2">NAME!</h1>
                <div className="center m-2 flex rounded-lg bg-dark-300 p-2 ">
                    <input
                        type="text"
                        placeholder={"Name"}
                        className="w-full rounded-lg p-2 text-lg shadow-md"
                        value={player.name}
                        onChange={(e) => setPlayer({ ...player, name: e.target.value })}
                    />
                </div>
            </div>

            <div className="m-2 bg-dark-400 p-2">
                <a href="https://quiltic.github.io/rpg-hell-frontend/rulebook/character-creation#stories">
                    <h1 className="m-2 rounded-md bg-dark-300 p-2">Stories</h1>
                </a>
                <textarea
                    placeholder="Here is a spot for your Stories!
    There is a link above for what a Story is!"
                    className="m-1 h-64 w-full rounded-lg bg-dark-300 p-1"
                    value={player.stories}
                    onChange={(text) => setPlayer({ ...player, stories: text.target.value })}
                />
            </div>

            <div className="m-2 bg-dark-400 p-2">
                <h1 className="m-2 rounded-md bg-dark-300 p-2">Notes</h1>
                <textarea
                    placeholder="Here you can put any notes you may want, including how your character would look."
                    className="m-1 h-64 w-full rounded-lg bg-dark-300 p-1"
                    value={player.notes}
                    onChange={(text) => setPlayer({ ...player, notes: text.target.value })}
                />
            </div>
        </div>
    );
}
