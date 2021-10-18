import React, { Suspense } from 'react';
import { useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';

import { Loading } from 'plug/extra/status/status.module';

import SiteLayout from "plug/layout/site-layout/site-layout.module.jsx";

import { parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

import MarkdownRender from 'plug/extra/markdown/markdown.module.jsx';

import styles from './post.module.css';

function MarkdownPost() {
    const { unique } = useParams();
    const post = useRecoilValue(callGithubAPI({
        key: 'get-issue-details',
        issue_number: parseInt(unique),
        path: 'data.repository.issue'
    }));
    const { meta, content } = parseMarkdown(post.body);
    console.log('文章', unique, meta, post);
    return (
        <article className={styles.root}>
            <h2>{post.title}</h2>
            <section className={styles.content}>
                <MarkdownRender content={content || ''} />
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