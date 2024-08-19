import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button/Button";
import json from "../../assets/OfflineJsons/traits.json";
import useApi from "../../hooks/useApi";
import { Trait } from "../../client";
import { sortArrayByReqs } from "../../util/sortingTools";



export default function JoshhellscapePage() {

    const { TraitsService } = useApi();

    const [allTraits, setAllTraits] = useState<Array<Trait>>([]);
    // const [mainstatSkillList, setMainstatSkillList] = useState(statSkillList);
    // const [secondstatSkillList, setSecondstatSkillList] = useState(statSkillList);
    // const [otherList, setOtherList] = useState(otherListCore);
    // const [diceCostList, setDiceCostList] = useState(diceCostListCore);
    const [curID, setCurID] = useState(0);
    const [nameText, setNameText] = useState("");
    const [mainStat, setMainStat] = useState("MONSTER 0");
    const [secondStat, setSecondStat] = useState("");
    const [diceCost, setDiceCost] = useState("P");
    const [otherDrop, setOtherDrop] = useState("");
    const [effectText, setEffectText] = useState("");
    const [curTrait, setCurTrait] = useState<Trait>();

    async function handleUpdate() {
        console.log(curTrait);
        if (curTrait == undefined) {
            return;
        }
        if (curTrait?.name != "") {
            const reply = await TraitsService.updateTrait({
                name: curTrait?.name,
                requestBody: curTrait,
            });
            console.log(reply);
        }
    }

    function addToPinnedTrait(s: Trait) {
        setCurID(s.id);
        setNameText(s.name);
        setEffectText(s.effect ?? "");
        setMainStat(s.req[0]);

        if (s.req?.length > 1) {
            // setSecondstatSkillList([,...statSkillList]);
            setSecondStat(s.req[1]);
        } else {
            setSecondStat("");
        }
        if (s.req?.length > 2) {
            setOtherDrop(s.req[2]);
        } else {
            setOtherDrop("");
        }
        setDiceCost(s.dice ? "#".repeat(s.dice ?? 1) : "P");
    }

    useEffect(() => {
        setAllTraits(Object.values(json));
    }, [TraitsService]);

    // useEffect(() => {
    //     // console.log(mainStat,secondStat,otherDrop);
    //     const trait = {
    //         id: curID,
    //         name: nameText.toLowerCase(),
    //         effect: effectText,
    //         req: [mainStat, secondStat, otherDrop],
    //         dice: 0,
    //         is_passive: true,
    //     };

    //     if (diceCost != "P") {
    //         trait.is_passive = false;
    //         trait.dice = diceCost.split("#").length - 1;
    //     }

    //     // remove the empty stuffs
    //     trait.req = trait.req.filter((str) => str !== "");

    //     setCurTrait(trait);
    // }, [
    //     nameText,
    //     diceCost,
    //     mainStat,
    //     secondStat,
    //     otherDrop,
    //     effectText,
    //     curID,
    // ]);


    return (
        <div className="p-2">
            <Button
                title="CheckList"
                className="flex flex-row"
                variant={"body"}
                onClick={ (e) => {
                    console.log(allTraits[60]);
                    console.log(curTrait);
                    setCurTrait(allTraits[60]);
                }
                }
            >
                CheckList
            </Button>
        </div>
    );
}