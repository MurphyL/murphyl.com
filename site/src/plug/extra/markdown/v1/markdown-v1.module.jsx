import React from 'react';

import ReactMarkdown from 'react-markdown';

import MarkdownRender from 'plug/extra/markdown/markdown.module.jsx';

import * as matter from 'gray-matter';
import TOML from '@iarna/toml';

import styles from './markdown-v1.module.css';

const components = {

};

const options = {
    className: styles.root,
    sourcePos: true,
    linkTarget: (href, children, title) => {

    }
};

export function MarkdownViewerV1({ code }) {
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

export const MarkdownViewer = MarkdownRender;