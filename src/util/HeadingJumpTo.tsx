import { Heading } from "../types/Heading";
type HeadingJumpToProps = {
    headings: Heading[];
};
export default function HeadingJumpTo({ headings }: HeadingJumpToProps) {
    return (
        <>
            <h2>Page Sections</h2>
            <ul className="max-w-sm rounded-md bg-body-900/50 px-6 py-2 dark:bg-dark-300/80">
                {headings.map((h: Heading) => {
                    return (
                        <li className="w-full">
                            <a href={`#${h.slug}`}>{h.text}</a>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
