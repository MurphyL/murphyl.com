import React, { Fragment, useMemo } from 'react';
import { Link, useParams } from "react-router-dom";

import { JSONPath } from 'jsonpath-plus-browser';

import { useDocumentTitle } from 'plug/hooks';

import { useIssueComments } from 'plug/github/graphql-utils';

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './notebook.module.css';

const params = {
    key: 'query-issue-comments',
    ghp_labels: 'X-TOPIC',
    path: '$.data.repository.issues.nodes'
};

export default function Notebook() {
    useDocumentTitle('笔记');
    const { group, unique } = useParams();
    const issues = useIssueComments('X-TOPIC');
    const topics = useMemo(() => (issues || []).map(({ url, title, body, publishedAt, comments: { nodes } }) => {
        const { unique, sort = 9999, content } = parseMarkdown(body);
        const children = nodes.map(({ url, body, publishedAt }) => {
            const { unique, excerpt, ...extra} = parseMarkdown(body);
            return { url, publishedAt, sort: 9999, unique: unique.trim(), ...extra };
        }).sort((a, b) => a.sort - b.sort);
        return { unique: unique.trim(), url, title, sort, content, publishedAt, children };
    }).sort((a, b) => a.sort - b.sort), [issues]);
    const [current] = (JSONPath({ path: `$[?(@.unique==="${group}")]` + (unique ? `.children[?(@.unique==="${unique}")]` : ''), json: topics, wrap: false }) || [ topics[0] ]);
    return (
        <div className={styles.root}>
            <aside className={styles.tree}>
                <dl>
                    {topics.map((group, index) => (
                        <Fragment key={index}>
                            <dt>
                                <Link to={`/kits/notebook/${group.unique}`}>{group.title}</Link>
                            </dt>
                            <dd>
                                <ul>
                                    {group.children.map(({ unique, title }, index) => (
                                        <li key={index}>
                                            <Link to={`/kits/notebook/${group.unique}/${unique}`}>{title || unique}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </Fragment>
                    ))}
                </dl>
            </aside>
            <main className={styles.board}>
                {current ? (
                    <Fragment>
                        <div className={styles.header}>
                            <b>{current.title}</b>
                            <div className={styles.toolbar}>
                                <Link to="/">主页</Link>
                                <a href={current.url} target="_blank" rel="noopener noreferrer">编辑</a>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <MarkdownViewer code={current.content} />
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div>404</div>
                    </Fragment>
                )}
            </main>
        </div>
    );
};