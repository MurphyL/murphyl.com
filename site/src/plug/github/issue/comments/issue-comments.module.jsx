import React, { useState } from 'react';

// import classNames from 'classnames';
import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import { get as pathGet } from 'object-path';

import renderSchema from 'plug/extra/schema-options.jsx';

import styles from './issue-comments.module.css';

export function IssueComment({ title, type, ...extra }) {
    switch (type) {
        case 'markdown/tab':
            return (
                <div className={styles.markdown} data-title={title}>
                    <MarkdownViewer content={extra.content || ''} />
                </div>
            );
        case 'toml/schema':
            return (
                <div className={styles.schema}>
                    {renderSchema(extra)}
                </div>
            );
        default:
            return (
                <div>other</div>
            );
    }
}

export default function IssueComments({ title, comments = {} }) {
    const [tab, setTab] = useState(0);
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.group}>
                    <b className={styles.title}>{title}</b>
                    {(comments.nodes || []).map(({ body }, index) => {
                        const comment = parseMarkdown(body);
                        return (
                            <span key={index} className={styles.item} onClick={() => setTab(comment)}>{comment.title}</span>
                        );
                    })}
                </div>
            </div>
            <div className={styles.board}>
                {isNaN(tab) ? (
                    <IssueComment {...tab} />
                ) : (
                    <IssueComment {...parseMarkdown(pathGet(comments, 'nodes.0.body'))} />
                )}
            </div>
        </div>
    );
}