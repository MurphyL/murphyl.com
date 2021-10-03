import React, { Suspense } from 'react';
import { useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';

import Markdown from 'markdown-to-jsx';

import { Loading } from 'plug/extra/status/status.module';

import SiteLayout from "plug/layout/site-layout/site-layout.module.jsx";

import { callGithubAPI } from 'plug/extra/rest_utils.jsx';

import { get as pathGet } from 'object-path';
import { parseMarkdown } from 'plug/extra/rest_utils.jsx';

import markdownOptions from 'plug/extra/markdown/markdown.module.jsx';

import styles from './post.module.css';

Markdown.displayName = 'MarkdownRender';



function MarkdownPost() {
    const { unique } = useParams();
    const fetched = useRecoilValue(callGithubAPI({
        key: 'get-issue-details',
        issue_number: parseInt(unique),
    }));
    const post = pathGet(fetched || {}, 'data.repository.issue');
    const { meta, content } = parseMarkdown(post.body);
    console.log('文章', unique, meta, post);
    return (
        <article className={styles.root}>
            <h2>{post.title}</h2>
            <section className={styles.content}>
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