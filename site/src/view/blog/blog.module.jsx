import React, { Fragment, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

import { Link } from "wouter";

import { useRecoilValue } from 'recoil';

import classNames from 'classnames';

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import SiteLayout from "plug/layout/site-layout/site-layout.module.jsx";

import { Loading } from 'plug/extra/status/status.module.jsx';

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

import styles from './blog.module.css';

export function PostSummary({ post }) {
    const { meta, excerpt, content } = parseMarkdown(post.body);
    console.log('blog post meta', meta);
    return (
        <div className={styles.post_summary}>
            <Link href={`/post/${post.number}`}>
                <a><h3>{post.title}</h3></a>
            </Link>
            <article className={classNames(styles.excerpt, post.kind)}>
                <MarkdownViewer code={(excerpt || content)} />
            </article>
        </div>
    );
};

function BlogList() {
    const issues = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: 'X-BLOG',
        path: 'data.repository.issues.nodes'
    }));
    console.log('blog', issues);
    return (
        <Fragment>
            <Helmet>
                <title>博客 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>
                {(issues || []).map((issue, index) => (
                    <PostSummary key={index} post={issue} />
                ))}
            </div>
        </Fragment>
    );
};

export default function Blog() {
    return (
        <SiteLayout>
            <Suspense fallback={<Loading />}>
                <BlogList />
            </Suspense>
        </SiteLayout>
    );
}
