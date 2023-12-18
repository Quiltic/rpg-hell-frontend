import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import markdown from "../../assets/test.md";
import jsonfile from "../../assets/temp_trait.json";

import { highlightKeywords, convertDictionaryToMD_Traits, runList } from "../../util/markdownTools";


runList()
// const md = highlightKeywords(markdown);
const md = highlightKeywords(convertDictionaryToMD_Traits(jsonfile));

console.log(md);
// I dont understand why but i need the commented out colors in order for them to show up. its weird
export default function RulebookPage() {
    return (
        <div>
            

            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {md}
            </Markdown>
            {/* <span className="text-body-700">asssss</span> */}
            {/* <span className="text-mind-700">asssss</span> */}
            {/* <span className="text-soul-700">asssss</span> */}
        </div>
    );
}
