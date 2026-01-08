import { Heading } from "../types/Heading";
type HeadingJumpToProps = {
    title: string;
    headings: Heading[];
};
export default function HeadingJumpTo({
    title = "Page Sections",
    headings,
}: HeadingJumpToProps) {
    return (
        <>
            <h2>{title}</h2>
            <ul
                style={{
                    columnCount: "auto",
                    columnFill: "auto",
                    columnWidth: "12rem",
                    columnGap: "1rem",
                    maxHeight: "32rem",
                }}
                className="max-w-lg rounded-md bg-body-900/50 px-6 py-2 dark:bg-dark-300/80"
            >
                {headings.map((h: Heading) => {
                    let c = "";
                    switch (h.level) {
                        case 4:
                            c += " ml-12";
                            break;
                        case 3:
                            c += " ml-8";
                            break;
                        case 2:
                            c += " ml-4";
                            break;
                        case 1:
                        default:
                            break;
                    }
                    return (
                        <li className={c} style={{ breakInside: "avoid" }}>
                            <a href={`#${h.slug}`}>{h.text}</a>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
