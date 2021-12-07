import React, { memo } from 'react';

import { useRecoilValue } from 'recoil';
import { useParams } from "react-router-dom";

import { useDocumentTitle } from 'plug/hooks';

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './post.module.css';

const MarkdownPost = memo(() => {

    const { unique } = useParams();
    const post = useRecoilValue(callGithubAPI({
        key: 'get-issue-details',
        issue_number: parseInt(unique),
        path: '$.data.repository.issue'
    }));
    useDocumentTitle(`${post.title} - 文章`);
    const { meta, content } = parseMarkdown(post.body);
    console.log('文章', unique, meta, post);
    return (
        <article className={styles.root}>
            <h2>{post.title}</h2>
            <section className={styles.content}>
                <MarkdownViewer code={content || ''} />
            </section>
        </article>
    );
});

export default MarkdownPost;