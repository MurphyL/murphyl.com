import React from 'react';

import classNames from 'classnames';

import { JSONPath } from 'jsonpath-plus-browser';

import ReactMarkdown from 'react-markdown';

import * as matter from 'gray-matter';
import TOML from '@iarna/toml';

import CodeBlock from 'plug/extra/code-block/code-block.module';

import styles from './markdown-v1.module.css';

// https://www.npmjs.com/package/react-markdown
const options = {
    className: styles.root,
    skipHtml: true,
    components: {
        a: ({ children, href }) => <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">{children}</a>,
        p: ({ children }) => <p className={styles.paragraph}>{ children }</p>,
        h1: ({ children }) => <h2 className={styles.title}>{children}</h2>,
        h2: ({ children }) => <h2 className={styles.title}>{children}</h2>,
        h3: ({ children }) => <h3 className={styles.title}>{children}</h3>,
        h4: ({ children }) => <h4 className={styles.title}>{children}</h4>,
        h5: ({ children }) => <h5 className={styles.title}>{children}</h5>,
        h6: ({ children }) => <h6 className={styles.title}>{children}</h6>,
        ul: ({ children }) => <ul className={classNames(styles.list)}>{children}</ul>,
        ol: ({ children }) => <ol className={classNames(styles.list)}>{children}</ol>,
        li: ({ children }) => <li className={classNames(styles.item)}>{children}</li>,
        pre: ({ children, node }) => {
            if(JSONPath({json: node, path: '$.children.0.tagName', wrap: false}) === 'code') {
                return children;
            } else {
                return (
                    <pre className={styles.prepare}>{children}</pre>
                );
            }
        },
        code: ({ inline, children, className }) => {
            if (inline) {
                return <span className={styles.code}>{children}</span>;
            } else {
                const language = className ? className.replace(/^language-/, '') : null;
                return (
                    <CodeBlock language={language} code={children.join('\n').trim()} />
                );
            }
        },
        blockquote: ({children}) => <blockquote className={styles.blockquote}>{children}</blockquote>
    }
};

export function MarkdownViewer({ code }) {
    return (
        <ReactMarkdown children={code} {...options} />
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
