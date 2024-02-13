export type TableOfContentsItem = {
    name: string;
    anchorHref?: string;
    className?: string;
    subItems?: TableOfContentsItem[]; // only implemented up to 2 layers deep.
    collapsable?: boolean;
};
