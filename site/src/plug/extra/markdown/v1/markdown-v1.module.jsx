import React from 'react';

import classNames from 'classnames';

import ReactMarkdown from 'react-markdown';
import { Code, CodeBlock } from '@atlaskit/code';

import * as matter from 'gray-matter';
import TOML from '@iarna/toml';

import { Title } from 'plug/extra/definition/definition.module.jsx';

import styles from './markdown-v1.module.css';

// https://www.npmjs.com/package/react-markdown
const options = {
    className: styles.root,
    skipHtml: true,
    components: {
        a: ({ children, href }) => <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">{children}</a>,
        h1: ({ children }) => <Title level="h2">{children}</Title>,
        h2: ({ children, node }) => <Title level={node.tagName}>{children}</Title>,
        h3: ({ children, node }) => <Title level={node.tagName}>{children}</Title>,
        h4: ({ children, node }) => <Title level={node.tagName}>{children}</Title>,
        h5: ({ children, node }) => <Title level={node.tagName}>{children}</Title>,
        h6: ({ children, node }) => <Title level={node.tagName}>{children}</Title>,
        ul: ({ children }) => <ul className={classNames(styles.list)}>{children}</ul>,
        ol: ({ children }) => <ol className={classNames(styles.list)}>{children}</ol>,
        li: ({ children }) => <li className={classNames(styles.item)}>{children}</li>,
        code: ({ inline, children, className }) => {
            if (inline) {
                return <Code className={styles.code}>{children}</Code>;
            } else {
                const language = className ? className.replace(/^language-/, '') : null;
                return <CodeBlock language={language} text={children.join('\n').trim()} />;
            }
        }
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
