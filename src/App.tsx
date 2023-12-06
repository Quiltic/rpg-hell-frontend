import "./App.css";
import Login from "./components/auth/Login";
import style from "./markdown-styles.module.css";

// import { Button } from "./components/ui/Button/Button";

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw';

import markdown from "./assets/test.md";

function changeAll(text: string): string {
    const colors: string[] = ["body", "mind", "soul"];
    let updatedText: string = text;

    for (const color of colors) {
        updatedText = highlightWord(updatedText, color);
    }

    return updatedText;
}

function highlightWord(text: string, word: string): string {
    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
    return text.replace(regex, `<span class=${word}>$1</span>`);
}

const md = changeAll(markdown);

function App() {
    return (
        <>
            <div>
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{md}</Markdown>
            </div>
        </>
    );
}

export default App;
