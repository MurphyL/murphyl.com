import React, { Suspense } from "react";
import { Helmet } from 'react-helmet-async';

import axios from 'axios';
import { selectorFamily, useRecoilValue } from 'recoil';

import DriftNavi from 'plug/extra/drift-navi/drift-navi.module.jsx';
import { Loading } from 'plug/include/status/status.module.jsx';

import { resolveToml } from 'plug/extra/rest_utils.jsx';

import styles from './snippet.module.css';

const snippetQuery = selectorFamily({
    key: 'post',
    get: () => () => resolveToml(axios.get(`/data/toml/snippet/snippets.toml`), '文章')
});

function SnippetNav() {
    const snippets = useRecoilValue(snippetQuery());
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