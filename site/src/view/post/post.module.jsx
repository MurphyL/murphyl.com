import React, { Fragment, Suspense, memo } from 'react';

import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

import styles from './post.module.css';

const MarkdownPost = memo(() => {
    const { unique } = useParams();
    const post = useRecoilValue(callGithubAPI({
        key: 'get-issue-details',
        issue_number: parseInt(unique),
        path: '$.data.repository.issue'
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
                    <MarkdownViewer code={content || ''} />
                </section>
            </article>
        </Fragment>
    );
});

export default MarkdownPost;