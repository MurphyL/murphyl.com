import React, { Suspense } from "react";
import { Helmet } from 'react-helmet-async';

import { useRecoilValue } from 'recoil';

import DriftNavi from 'plug/extra/drift-navi/drift-navi.module.jsx';
import { Loading } from 'plug/extra/status/status.module.jsx';

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

import styles from './snippet.module.css';

function SnippetNav() {
    const snippets = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: 'X-CODE',
    }));
    return (
        <div className={styles.navi}>{JSON.stringify(snippets)}</div>
    );
};

function SnippetBoard() {
    return (
        <div className={styles.board}>board</div>
    );
}

export default function Snippet() {
    return (
        <Suspense fallback={<Loading />}>
            <Helmet>
                <title>代码片段 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>
                <SnippetNav />
                <SnippetBoard />
            </div>
            <DriftNavi links={[{
                label: '首页',
                link: '/'
            }]} />
        </Suspense>
    );
}