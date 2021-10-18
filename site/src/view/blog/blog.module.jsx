import React, { Fragment, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { get as pathGet } from 'object-path';

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import SiteLayout from "plug/layout/site-layout/site-layout.module.jsx";

import { Loading } from 'plug/extra/status/status.module.jsx';

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

import styles from './blog.module.css';

export function BlogPostSummary({ post }) {
    const { meta, excerpt, content } = parseMarkdown(post.body);
    console.log('blog post meta', meta);
    return (
        <div className={styles.post_summary}>
            <Link to={`/post/${post.number}`}>
                <h2>{post.title}</h2>
            </Link>
            <article className={classNames(styles.excerpt, post.kind)}>
                <MarkdownViewer content={(excerpt || content)} />
            </article>
        </div>
    );
};

function BlogList() {
    const fetched = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: 'X-BLOG',
    }));
    const issues = pathGet(fetched, 'data.repository.issues');
    console.log('blog', issues);
    return (
        <Fragment>
            <Helmet>
                <title>博客 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>
                {(issues.nodes || []).map((issue, index) => (
                    <BlogPostSummary key={index} post={issue} />
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
