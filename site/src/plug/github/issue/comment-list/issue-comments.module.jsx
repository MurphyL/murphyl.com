import React, { useState } from 'react';

import MarkdownRender from 'plug/extra/markdown/markdown.module.jsx';

// import classNames from 'classnames';
import { parseMarkdown } from 'plug/extra/rest-utils.jsx';

import { get as pathGet } from 'object-path';

import styles from './issue-comments.module.css';

export function IssueComment({ title, type, content }) {
    switch (type) {
        case 'markdown/tab':
            return (
                <div className={styles.markdown} data-title={title}>
                    <MarkdownRender content={content || ''} />
                </div>
            );
        default:
            return (
                <div>other</div>
            );
    }
}

export default function IssueCommentList({ title, comments = {} }) {
    const [tab, setTab] = useState(0);
    console.log(tab);
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