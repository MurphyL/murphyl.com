import React, { memo } from 'react';

import { useParams } from "react-router-dom";

import { useDocumentTitle } from 'plug/hooks';

import { useIssueDetails } from 'plug/github/graphql-utils';

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './post.module.css';

const MarkdownPost = memo(() => {
    const { unique } = useParams();
    const post = useIssueDetails(unique);
    useDocumentTitle(`${post.title} - 文章`);
    const { meta, content } = parseMarkdown(post.body);
    console.log('文章', unique, meta, post);
    return (
        <article className={styles.root}>
            <h2>{post.title}</h2>
            <section className={styles.content}>
                <MarkdownViewer value={content || ''} />
            </section>
        </article>
    );
});

export default MarkdownPost;