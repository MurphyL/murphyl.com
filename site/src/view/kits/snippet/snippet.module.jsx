import React, { Suspense } from "react";
import axios from 'axios';
import { selectorFamily, useRecoilValue } from 'recoil';

import { Loading } from 'plug/include/status/status.module.jsx';

import { resolveToml } from 'plug/extra/rest_utils.jsx';

import styles from './snippet.module.css';

const snippetQuery = selectorFamily({
    key: 'post', 
    get: () => () => resolveToml(axios.get(`/data/toml/snippet/snippets.toml`), '文章')
});

function SnippetNav() {
    const snippets = useRecoilValue(snippetQuery());
    console.log(snippets);
    return (
        <div className={styles.navi}>navi</div>
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
            <div className={styles.root}>
                <SnippetNav />
                <SnippetBoard />
            </div>
        </Suspense>
    );
}