type Props = {
    children: string;
    colorClassName: string;
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Pill({ children, colorClassName }: Props) {
    const classes = classNames(
        "flex h-6 min-w-fit px-3 items-start justify-center rounded-md text-light m-1 bg-aabase",
        colorClassName
    );
    return (
        <div className={classes} style={{ whiteSpace: "nowrap" }}>
            {children}
        </div>
    );
}

// Example of usage
// <Pill colorClassName="bg-body">Body</Pill>
