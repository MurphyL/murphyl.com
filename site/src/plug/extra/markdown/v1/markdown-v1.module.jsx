import React from 'react';

import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { Code, CodeBlock } from '@atlaskit/code';

import * as matter from 'gray-matter';
import TOML from '@iarna/toml';

import styles from './markdown-v1.module.css';

const components = {
    h1: ({ children }) => <h2 className={styles.title}>{children}</h2>,
    h2: ({ children }) => <h2 className={styles.title}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.title}>{children}</h3>,
    h4: ({ children }) => <h4 className={styles.title}>{children}</h4>,
    h5: ({ children }) => <h5 className={styles.title}>{children}</h5>,
    h6: ({ children }) => <h6 className={styles.title}>{children}</h6>,
    code: ({ inline, children, className }) => {
        if (inline) {
            return <Code>{children}</Code>
        } else {
            return <CodeBlock language={className.replace(/^language-/, '')} text={children.join('\n').trim()} />;
        }
    }
};

const options = {
    className: styles.root,
    sourcePos: true,
    linkTarget: (href, children, title) => {
        return (/^http/.test(href)) ? (
            <a href={href} title={title} target="_blank" rel="noopener noreferrer">{children}</a>
        ) : (
            <Link to={href}>{children}</Link>
        );
    }
};

export function MarkdownViewer({ code }) {
    return (
        <ReactMarkdown children={code} components={components} {...options} />
    );
};

export const parseMarkdown = (data = '') => {
    const { data: meta, excerpt, content } = matter(data, {
        excerpt: true,
        language: 'toml',
        delims: ['```', '```'],
        excerpt_separator: '<!-- more -->',
        engines: {
            toml: TOML.parse.bind(TOML),
        }
    });
    return { ...meta, excerpt, content };
};
