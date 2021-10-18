import React, { Fragment, Suspense } from 'react';
import { useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';

import { Loading } from 'plug/extra/status/status.module';

import SiteLayout from "plug/layout/site-layout/site-layout.module.jsx";

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

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
        <Fragment>
            <Helmet>
                <title>{post.title} - 文章 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <article className={styles.root}>
                <h2>{post.title}</h2>
                <section className={styles.content}>
                    <MarkdownViewer content={content || ''} />
                </section>
            </article>
        </Fragment>
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