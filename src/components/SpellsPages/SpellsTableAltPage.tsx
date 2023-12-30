import { useState, useEffect, useCallback } from "react";
import { Spell } from "../../client";

import useApi from "../../hooks/useApi";

import { Button } from "../../components/ui/Button/Button";

import json from "../../assets/OfflineJsons/Spells.json";

// To Sort
// I need to sort the "allspells" object, then re-search if applicable.

export default function SpellsTableAltPage() {
    const { SpellsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allSpells, setAllSpells] = useState<Array<Spell>>([]);
    const [displayedSpells, setDisplayedSpells] = useState<Array<Spell>>([]);

    // Runs on Render update (only on changes)
    useEffect(() => {
        async function getSpells() {
            try {
                const spellsRaw = await SpellsService.getAllSpells();
                const spells = Object.values(spellsRaw);

                const spellsSortedByLevel = spells.sort((t1, t2) => {
                    // console.log(t.name);
                    return t1.level - t2.level;
                });
                setAllSpells(spellsSortedByLevel);
                // setSpellsObjectSorted(spells);
                setDisplayedSpells(spellsSortedByLevel);
            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    const spells = Object.values(json);
                    setAllSpells(spells);
                    // setSpellsObjectSorted(spells);
                    setDisplayedSpells(spells);
                }
            }
        }
        getSpells();
    }, [SpellsService]);

    function handleUpdateDisplayedSpells() {
        if (searchValue == "") {
            setDisplayedSpells(allSpells);
            return;
        }

        const filteredSpells = allSpells.filter((t) => {
            return (
                t.name.toLowerCase().includes(searchValue) ||
                t.effect?.toLowerCase().includes(searchValue)
            );
        });

        setDisplayedSpells(filteredSpells);
    }

    return (
        <>
            <span>Search:</span>
            <input
                type="text"
                name="search"
                onChange={(e) => setSearchValue(e.target.value.toLowerCase())} // remove the toLowerCase if its an issue?
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleUpdateDisplayedSpells();
                    }
                }}
            />

            <table className="border-collapse table-auto dark:text-light text-dark">
                <thead className="dark:bg-dark-700 bg-light-300 font-bold">
                    <tr>
                        <th>Name</th>
                        <th>Strain</th>
                        <th>Dice</th>
                        <th>Effect</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedSpells.map((spell) => {
                        return (
                            <tr>
                                <td className="font-bold capitalize">
                                    {spell.name}
                                </td>
                                <td>{spell.level}</td>
                                <td>{"#".repeat(spell.dice ?? 1)}</td>
                                <td>{spell.effect}</td>
                                <td className="capitalize">
                                    {spell.tags?.join(", ")}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
