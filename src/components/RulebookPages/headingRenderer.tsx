import React from "react";

const flatten = (text: string, child) => {
    return typeof child === "string"
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
};

/**
 * HeadingRenderer is a custom renderer
 * It parses the heading and attaches an id to it to be used as an anchor
 */
const HeadingRenderer = (props) => {
    // console.log(props)
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, "");
    const slug = text
        .toLowerCase()
        .replace(/['".()!/:,]/g, "")
        .replace(/\W/g, "-");
    return React.createElement(
        props.node.tagName,
        { id: slug },
        props.children
    );
};

export default HeadingRenderer;
