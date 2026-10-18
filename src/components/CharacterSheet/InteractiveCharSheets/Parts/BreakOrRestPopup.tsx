import Popup from "../../../ui/Popups/Popup";
import defJson from "../../../../assets/OfflineJsons/definitions.json";
import { playerCharacterType } from "../../../../types/playerCharacterType";
import { Button } from "../../../ui/Button/Button";
import { toast } from "../../../ui/Toast";
import Checkbox from "../../../ui/Checkbox";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    useBreak: number;
};

export default function BreakOrRestPopup({ player, setPlayer, isOpen, setIsOpen, useBreak }: Props) {
    // let dontShowBreakPopup = window.localStorage.getItem("dontShowBreakPopup") == "true" ? true : false;
    // let dontShowRestPopup = window.localStorage.getItem("dontShowRestPopup") == "true" ? true : false;

    return (
        <>
            {/* Rest/Break Popup */}
            <Popup
                displayedContentName={`Take a ${defJson[useBreak].name}?`}
                displayedContent={
                    <>
                        <div className="rounded-md bg-dark-400 p-2">
                            <div className="p-2 pb-0 text-light-300">{defJson[useBreak].short}</div>
                            {/* <Checkbox
                            isChecked={useBreak == 1 ? dontShowBreakPopup : dontShowRestPopup} 
                            setIsChecked={()=>{
                                if (useBreak == 1)
                                    dontShowBreakPopup = !dontShowBreakPopup
                                else
                                    dontShowRestPopup = !dontShowRestPopup
                            }}
                            text={"Don't ask again."} 
                            className={"justify-end"}>
                        </Checkbox> */}
                        </div>
                        <div className="m-4 flex flex-row items-center justify-between">
                            <Button
                                className=""
                                variant={"nature"}
                                onClick={() => {
                                    // if (dontShowBreakPopup)
                                    //     window.localStorage.setItem("dontShowBreakPopup","true")
                                    // if (dontShowRestPopup)
                                    //     window.localStorage.setItem("dontShowRestPopup","true")

                                    if (useBreak == 1) {
                                        setPlayer({
                                            ...player,
                                            calculatedStats: {
                                                ...player.calculatedStats,
                                                curStrain: player.calculatedStats.maxStrain,
                                            },
                                        });
                                        toast(
                                            <div className="text-center">Took a Break and got all Strain back!</div>,
                                            { className: "ring-2 ring-soul" }
                                        );
                                    } else {
                                        setPlayer({
                                            ...player,
                                            calculatedStats: {
                                                ...player.calculatedStats,
                                                curHp: player.calculatedStats.maxHp,
                                                curStrain: player.calculatedStats.maxStrain,
                                            },
                                        });
                                        toast(
                                            <div className="text-center">
                                                Took a Rest and got all Health and Strain back!
                                            </div>,
                                            { className: "ring-2 ring-medicine" }
                                        );
                                    }

                                    setIsOpen(false);
                                }}
                            >
                                Yes
                            </Button>
                            <Button
                                className=""
                                variant={"medicine"}
                                onClick={() => setIsOpen(false)}
                            >
                                No
                            </Button>
                        </div>
                    </>
                }
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isSmol={true}
            ></Popup>
        </>
    );
}
