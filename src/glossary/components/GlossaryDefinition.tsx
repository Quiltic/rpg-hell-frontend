import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { GlossaryHit, definitionHtml, rulebookHref } from "../resolve";

type Props = {
    hit: GlossaryHit;
    onNavigate?: () => void;
    href?: string;
};

/**
 * @param hit - the record to show and the source it came from
 * @param onNavigate - called when a link in the body or the rulebook link is clicked
 * @param href - replaces the target of the rulebook link
 * @returns the definition body with nested terms as links, then the "Read in the rulebook" link
 */
export default function GlossaryDefinition({ hit, onNavigate, href }: Props) {
    return (
        <>
            <Markdown
                className="tooltip_body"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    a: ({ href: to, children }) => (
                        <Link
                            to={to ?? "#"}
                            onClick={onNavigate}
                            className="underline decoration-dotted"
                        >
                            {children}
                        </Link>
                    ),
                }}
            >
                {definitionHtml(hit)}
            </Markdown>

            <Link
                to={href ?? rulebookHref(hit)}
                onClick={onNavigate}
                className="mt-2 flex flex-row gap-1 text-sm text-soul-700 underline"
            >
                Read in the rulebook{" "}
                <ArrowTopRightOnSquareIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                />
            </Link>
        </>
    );
}
