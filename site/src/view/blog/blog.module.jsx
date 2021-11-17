import React, { Fragment, Suspense } from 'react';

import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';

import classNames from 'classnames';

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";
import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

import styles from './blog.module.css';

export function PostSummary({ post }) {
    const { meta, excerpt, content } = parseMarkdown(post.body);
    console.log('blog post meta', meta);
    return (
        <div className={styles.post_summary}>
            <Link to={`/post/${post.number}`}>
                <h3>{post.title}</h3>
            </Link>
            <article className={classNames(styles.excerpt, post.kind)}>
                <MarkdownViewer code={(excerpt || content)} />
            </article>
        </div>
    );
};

export default function PostList() {
    const issues = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: 'X-BLOG',
        path: 'data.repository.issues.nodes'
    }));
    console.log('blog', issues);
    return (
        <div className={styles.root}>
            {(issues && Array.isArray(issues) && issues.length) ? (issues || []).map((issue, index) => (
                <PostSummary key={index} post={issue} />
            )) : (
                <div>暂无文章……</div>
            )}
        </div>

    );
};