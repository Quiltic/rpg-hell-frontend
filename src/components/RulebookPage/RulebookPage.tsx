import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import markdown from "../../assets/test.md";
import jsonfile from "../../assets/temp_trait.json";

import { highlightKeywords, convertDictionaryToMD_Traits } from "../../util/markdownTools";

function formdata() {
    const _name: HTMLInputElement = document.getElementById("TraitNameInput");
    const _requirements: HTMLInputElement = document.getElementById("TraitReqInput");
    const _dice: HTMLInputElement = document.getElementById("TraitDiceInput");
    const _effect: HTMLInputElement = document.getElementById("TraitEffectInput");

    console.log(_name,_requirements);
    // const jsonitem = {
    //     name: _name.value.trim(),
    //     requirements: _requirements.value.trim(),
    //     dice: _dice.value.trim(),
    //     effect: _effect.value.trim(),

    // }
}



// const md = highlightKeywords(markdown);
const md = highlightKeywords(convertDictionaryToMD_Traits(jsonfile));

console.log(md);
// I dont understand why but i need the commented out colors in order for them to show up. its weird
export default function RulebookPage() {
    return (
        <div>
            {/* <form onSubmit={formdata()}>
                <label>Name</label>
                <input type="text" placeholder="Name" id="TraitNameInput"/>
                <label>Requirements</label>
                <input type="text" placeholder="Body" id="TraitReqInput"/>
                <label>Dice</label>
                <input type="text" placeholder="##" id="TraitDiceInput"/>
                <label>Effect</label>
                <input type="text" placeholder="wee" id="TraitEffectInput"/>
                <input type="submit" value={"Submit"}/>
            </form> */}

            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {md}
            </Markdown>
            {/* <span className="text-body-700">asssss</span> */}
            {/* <span className="text-mind-700">asssss</span> */}
            {/* <span className="text-soul-700">asssss</span> */}
        </div>
    );
}
