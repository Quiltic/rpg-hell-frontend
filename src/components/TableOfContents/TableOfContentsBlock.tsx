import { classNames } from "../../util/tableTools";

import { TableOfContentsItem } from "../../types/TableOfContentsItem";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type Props = { item: TableOfContentsItem; className?: string };

type SubItemProps = { items: TableOfContentsItem[] };

function buildHref(baseHref: string | undefined, name: string) {
    let bh = "";
    if (baseHref == undefined) {
        bh = name.toLowerCase().split(" ").join("-");
    } else {
        bh = baseHref;
    }
    return "#" + bh;
}

function TableOfContentsSubBlock({ items: items }: SubItemProps) {
    return (
        <ul className="ml-2 px-6 py-2 bg-body-900/50 dark:bg-dark-300/80 rounded-md">
            {items.map((c) => {
                if (c.collapsable) {
                    return (
                        <Disclosure as="li" className="w-full">
                            {({ open }) => (
                                <>
                                    <div className="flex ">
                                        <Disclosure.Button className="">
                                            <ChevronDownIcon
                                                className={`${
                                                    open
                                                        ? ""
                                                        : "-rotate-90 transform"
                                                } h-6 w-6`}
                                            />
                                        </Disclosure.Button>
                                        <a
                                            href={buildHref(
                                                c.anchorHref,
                                                c.name
                                            )}
                                            className={classNames(
                                                "pr-6 md:pr-24 py-1",
                                                c.className ?? ""
                                            )}
                                        >
                                            {c.name}
                                        </a>
                                    </div>
                                    <Disclosure.Panel className="">
                                        {c.subItems && (
                                            <TableOfContentsSubBlock
                                                items={c.subItems}
                                            />
                                        )}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    );
                }
                return (
                    <li className="w-full">
                        <a
                            href={buildHref(c.anchorHref, c.name)}
                            className={classNames(
                                "pr-24 py-1",
                                c.className ?? ""
                            )}
                        >
                            {c.name}
                        </a>
                        {c.subItems && (
                            <TableOfContentsSubBlock items={c.subItems} />
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export default function TableOfContentsBlock({
    item: item,
    className: className,
}: Props) {
    const heading = (
        <h3 className={classNames("ml-3", item.className ?? "")}>
            {item.name}
        </h3>
    );
    return (
        <div
            className={classNames(
                className ?? "",
                "rounded-md whitespace-pre-wrap"
            )}
        >
            {item?.anchorHref ? (
                <a href={buildHref(item.anchorHref, item.name)}>{heading}</a>
            ) : (
                <>{heading}</>
            )}
            {item?.subItems && (
                <TableOfContentsSubBlock items={item.subItems} />
            )}
        </div>
    );
}
