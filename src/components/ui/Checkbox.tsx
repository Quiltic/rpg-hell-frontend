type Props = {
    isChecked:boolean;
    setIsChecked: (s: boolean) => void;
    text:string;
    className:string;
};

export default function Checkbox({
    isChecked: isChecked,
    setIsChecked: setIsChecked,
    text: text,
    className: className = "",
}: Props) {

    return(
        <div className={"flex flex-row m-2 content-center ".concat(className)}>
            <input
                type="checkbox"
                value={text}
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
            />
            <div className="p-2 grid content-center">
                {text}
            </div>
        </div>
    );
}