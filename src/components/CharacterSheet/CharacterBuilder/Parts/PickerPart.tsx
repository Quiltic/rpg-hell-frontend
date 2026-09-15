import { PlusIcon } from "@heroicons/react/24/outline";

type Props = {
    // player: playerCharacterType;
    // setPlayer: (player: playerCharacterType) => void;
    useEmpty: boolean;
    emptyText?: string;
    emptyButton: () => void;
    filled: any;
    filledButton: () => void;
};

export default function PickerPart({
    useEmpty: useEmpty,
    emptyText: emptyText,
    emptyButton: emptyButton,
    filled: filled,
    filledButton: filledButton,
}: Props) {
    return (
        <>
            {useEmpty && (
                <div
                    className="clickable m-4 flex
                        w-48 items-center justify-center rounded-md border-2 border-solid border-body-700/10 
                        bg-dark-300 p-2"
                    onClick={emptyButton}
                >
                    {emptyText}
                    <PlusIcon className="h-12 w-12" />
                </div>
            )}

            {!useEmpty && (
                <div
                    className="clickable"
                    onClick={filledButton}
                >
                    {filled}
                </div>
            )}
        </>
    );
}
