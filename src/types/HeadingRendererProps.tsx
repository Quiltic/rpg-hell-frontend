import { Heading } from "./Heading";

export default interface HeadingRendererProps {
    node: {
        tagName: string;
        type: string;
        depth: number;
    };
    children: React.ReactNode;
    setHeadings: React.Dispatch<React.SetStateAction<Heading[]>>;
}
