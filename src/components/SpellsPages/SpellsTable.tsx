import { Spell } from "../../client";

type Props = { displayedSpells: Spell[] };

export default function SpellsTable({ displayedSpells }: Props) {
    return (
        <table className="border-collapse table-auto dark:text-light text-dark rounded-md">
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
    );
}
