type Props = {
    children: string,
    colorClassName: string,
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Pill({children, colorClassName}: Props) {

    const classes = classNames("flex h-6 w-fit px-3 items-start justify-center rounded-full text-white", colorClassName)
  return (
    <div className={classes}>{children}</div>
  )
}

// Example of usage
// <Pill colorClassName="bg-body">Body</Pill>
