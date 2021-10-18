import React from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './markdown-v1.module.css';

const components = {

};

const options = {
    className: styles.root,
    sourcePos: true,
    linkTarget: (href, children, title) => {

    }
};

export default function MarkdownViewer({ code }) {
    return (
        <ReactMarkdown children={code} components={components} {...options} />
    );
}