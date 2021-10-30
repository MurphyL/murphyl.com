import React, { useState, Fragment } from 'react';

import classNames from 'classnames';
import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import { get as pathGet } from 'object-path';

import renderSchema from 'plug/extra/schema-options.jsx';

import styles from './issue-comments.module.css';

export function IssueComment({ title, type, content, ...extra }) {
    return (
        <Fragment>
            <div className={styles.schema}>
                {renderSchema(extra)}
            </div>
            <div className={styles.markdown}>
                <MarkdownViewer code={content || ''} />
            </div>
        </Fragment>
    );
}

export default function IssueComments({ title, comments }) {
    const [tab, setTab] = useState(0);
    const nodes = (comments.nodes || []).map(({ body }) => parseMarkdown(body));
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.group}>
                    <b className={styles.title}>{title}</b>
                    {nodes.map(({ title }, index) => (
                        <span key={index} className={classNames(styles.item, { [styles.selected]: index === tab })} onClick={() => setTab(index)}>{title}</span>
                    ))}
                </div>
            </div>
            <div className={styles.board}>
                <IssueComment {...pathGet(nodes, [tab])} />
            </div>
        </div>
    );
}