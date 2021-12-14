import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react';
import { NavLink, Navigate, useParams, useOutletContext } from "react-router-dom";

import { useDocumentTitle } from 'plug/hooks';
import { useIssueComments } from 'plug/github/graphql-utils';

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './notebook.module.css';

const PATHNAME_PREFIX = 'notebook';

function Notebook({ title = '笔记', labels }) {
    useDocumentTitle(title);
    const { group, unique } = useParams();
    const { setNaviItems } = useOutletContext();
    const [topics, setTopics] = useState(null);
    const issues = useIssueComments(labels);
    useEffect(() => {
        const navi = [];
        setTopics(Object.fromEntries((issues || []).map(({ url, title, body, publishedAt, comments: { nodes } }) => {
            const { unique, sort = 9999, content } = parseMarkdown(body);
            navi.push({ name: title, path: `./${PATHNAME_PREFIX}/${unique.trim()}`, sort });
            const children = nodes.map(({ url, body, publishedAt }) => {
                const { unique, excerpt, ...extra } = parseMarkdown(body);
                return { unique: unique.trim(), url, publishedAt, sort: 9999, ...extra };
            }).sort((a, b) => a.sort - b.sort);
            return [unique.trim(), { url, title, sort, content, publishedAt, children }];
        })));
        setNaviItems(navi.sort((a, b) => a.sort - b.sort));
    }, [issues]);
    const current = useMemo(() => {
        if (topics) {
            if (unique && topics[group]) {
                return topics[group].children.find((comment) => comment.unique === unique);
            }
            if (topics[group]) {
                return topics[group];
            }
            return 0;
        }
        return null;
    }, [topics, group, unique]);
    return (
        <div className={styles.root}>
            {(() => {
                if (current === null) {
                    return (
                        <div>404</div>
                    );
                } else if (current === 0) {
                    const [first] = Object.entries(topics).map(([key, { sort }]) => ({ key, sort })).sort((a, b) => a.sort - b.sort);
                    return (
                        <Navigate to={`./${first.key}`} replace={true} />
                    );
                } else {
                    return (
                        <Fragment>
                            <aside className={styles.tree}>
                                <ul>
                                    {(topics[group].children || []).map(({ unique, title }, index) => (
                                        <li key={index}>
                                            <NavLink to={`/kits/notebook/${group}/${unique}`}>{title || unique}</NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                            <main className={styles.board}>
                                <div className={styles.content}>
                                    <MarkdownViewer value={current.content || 'empty'} />
                                </div>
                            </main>
                        </Fragment>
                    );
                }
            })()}
        </div>
    );
};

export default {
    path: PATHNAME_PREFIX,
    element: (
        <Suspense fallback="loading...">
            <Notebook title="技术笔记" labels={['X-TOPIC']} />
        </Suspense>
    ),
    children: [{
        path: ':group',
        element: null,
        children: [{
            path: ':unique',
            element: null,
        }]
    }]
};