import "./App.css";
import style from './markdown-styles.module.css';

// import { Button } from "./components/ui/Button/Button";

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote![FIRE](https://i.pngimg.me/thumb/f/720/m2i8A0d3m2b1G6b1.jpg) with ~strikethrough~ and a URL: https://reactjs.org.
![FIRE](https://i.pngimg.me/thumb/f/720/m2i8A0d3m2b1G6b1.jpg)
* Lists
* [ ] t![FIRE](https://i.pngimg.me/thumb/f/720/m2i8A0d3m2b1G6b1.jpg)odo
* [x] done![FIRE](https://i.pngimg.me/thumb/f/720/m2i8A0d3m2b1G6b1.jpg)


A table:![FIRE]()


| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text ![FIRE](https://i.pngimg.me/thumb/f/720/m2i8A0d3m2b1G6b1.jpg)|

![FIRE](https://i.pngimg.me/thumb/f/720/m2i8A0d3m2b1G6b1.jpg)

`

function App() {
    return (
        <>
            <div>
            <Markdown remarkPlugins={[remarkGfm]} className={style.reactMarkDown}>{markdown}</Markdown>
            </div>
        </>
    );
}

export default App;



