import React, { Suspense } from 'react';
import { useParams } from "react-router-dom";
import { selectorFamily, useRecoilValue } from 'recoil';
import axios from 'axios';

import Markdown from 'markdown-to-jsx';

import { Loading } from 'plug/include/status/status.module';

import SiteLayout from "plug/template/site-layout/site-layout.module.jsx";

import { resolveMarkdown } from 'plug/extra/rest_utils.jsx';

import markdownOptions from 'plug/extra/markdown/markdown.module.jsx';

import styles from './post.module.css';

Markdown.displayName = 'MarkdownRender';

const postQuery = selectorFamily({
    key: 'post', 
    get: (unique) => () => resolveMarkdown(axios.get(`/data/markdown/${unique}`), '文章')
});

function MarkdownPost() {
    const { unique } = useParams();
    const { meta, content } = useRecoilValue(postQuery(unique));
    return (
        <article className={styles.root}>
            {!meta.truncate && <h2>{meta.title || unique}</h2>}
            <section>
                <Markdown children={content || ''} options={markdownOptions} />
            </section>
        </article>
    );
};

export default function Post() {
    return (
        <SiteLayout>
            <Suspense fallback={<Loading />}>
                <MarkdownPost />
            </Suspense>
        </SiteLayout>
    );
};