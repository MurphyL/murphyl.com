import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useNavigate, useParams, useOutletContext } from "react-router-dom";

import { useDocumentTitle, jsonpath } from 'plug/hooks';
import { useIssueComments } from 'plug/github/graphql-utils';

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './notebook.module.css';

const PATHNAME_PREFIX = 'notebook';

function Notebook() {
    useDocumentTitle('笔记');
    const { group, unique } = useParams();
    const { setNaviItems } = useOutletContext();
    const [topics, setTopics] = useState([]);
    const issues = useIssueComments('X-TOPIC');
    useEffect(() => {
        const navi = [];
        setTopics((issues || []).map(({ url, title, body, publishedAt, comments: { nodes } }) => {
            const { unique, sort = 9999, content } = parseMarkdown(body);
            navi.push({ name: title, path: `./${PATHNAME_PREFIX}/${unique.trim()}`, sort });
            const children = nodes.map(({ url, body, publishedAt }) => {
                const { unique, excerpt, ...extra } = parseMarkdown(body);
                return { url, publishedAt, sort: 9999, unique: unique.trim(), ...extra };
            }).sort((a, b) => a.sort - b.sort);
            return { unique: unique.trim(), url, title, sort, content, publishedAt, children };
        }));
        setNaviItems(navi.sort((a, b) => a.sort - b.sort));
    }, [issues]);
    const [ current ] = useMemo(() => jsonpath(topics, `$[?(@.unique=='${group}')]`) || topics, [group, topics]);
    return (
        <div className={styles.root}>
            {current ? (
                <Fragment>
                    <aside className={styles.tree}>
                        <ul>
                            {(current.children || []).map(({ unique, title }, index) => (
                                <li key={index}>
                                    <Link to={`/kits/notebook/${current.unique}/${unique}`}>{title || unique}</Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                    <main className={styles.board}>
                        <div className={styles.content}>
                            <MarkdownViewer value={current.content || '> Nothing here!'} />
                            <Outlet />
                        </div>
                    </main>
                </Fragment>
            ) : (
                <div>404</div>
            )}
        </div>
    );
};

const NoteGroup = () => {
    const { group, unique } = useParams();
    console.log(group, unique);
    return null;
};

export default {
    path: PATHNAME_PREFIX,
    element: (
        <Suspense fallback="loading...">
            <Notebook />
        </Suspense>
    ),
    children: [{
        path: ':group',
        element: <NoteGroup />,
        children: [{
            path: ':unique',
            element: null,
        }]
    }]
};