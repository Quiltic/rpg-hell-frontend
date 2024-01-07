import { Spell } from "../../client";
// import { highlightKeywords } from "../../util/markdownTools";

import { formatEffectString } from "../../util/textFormatting";
import { Button } from "../ui/Button/Button";

type Props = {
    displayedSpells: Spell[];
    moveSpell?: (spell: Spell) => void;
    moveIsAdd?: boolean;
};

const PinIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
    </svg>
);

const RemoveIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
        />
    </svg>
);
export default function SpellsTable({
    displayedSpells,
    moveSpell,
    moveIsAdd = true,
}: Props) {
    return (
        <table className="border-collapse table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-700 bg-light-300 font-bold">
                <tr>
                    <th>Name</th>
                    <th>Strain</th>
                    <th>Dice</th>
                    <th>Effect</th>
                    <th>Tags</th>
                    {moveSpell != undefined && (
                        <th>{moveIsAdd ? "Save" : "Unsave"}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {displayedSpells.map((spell) => {
                    const ee = formatEffectString(spell.effect ?? "");
                    return (
                        <tr>
                            <td className="font-bold capitalize">
                                {spell.name}
                            </td>
                            <td>{spell.level}</td>
                            <td>{"#".repeat(spell.dice ?? 1)}</td>
                            <td dangerouslySetInnerHTML={{ __html: ee }}></td>
                            <td className="capitalize" align="center">
                                {spell.tags?.join(", ")}
                            </td>
                            {moveSpell != undefined && (
                                <td>
                                    <Button
                                        variant={
                                            moveIsAdd
                                                ? "subtle-nature"
                                                : "subtle-medicine"
                                        }
                                        leftIcon={
                                            moveIsAdd ? PinIcon : RemoveIcon
                                        }
                                        className="rounded-md w-6 h-8"
                                        onClick={() => {
                                            moveSpell(spell);
                                        }}
                                    ></Button>
                                </td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
