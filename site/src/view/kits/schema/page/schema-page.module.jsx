import React, { Suspense } from 'react';
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';

import { Loading } from 'plug/extra/status/status.module.jsx';

import MarkdownRender from 'plug/extra/markdown/markdown.module.jsx';

import { callGithubAPI, parseMarkdown } from 'plug/extra/rest-utils.jsx';

import renderer from 'plug/extra/schema-options.jsx';

import styles from './schema-page.module.css';

export function SchemaRenderer({ unique }) {
    const pages = useRecoilValue(callGithubAPI({
        key: 'query-issue-comments',
        ghp_labels: `X-PAGE`,
        path: 'data.repository.issues.nodes'
    }));
    const mapper = {};
    (pages || []).forEach(({ body, ...info }) => {
        const { content, ...meta } = parseMarkdown(body);
        mapper[meta.unique] = { ...info, ...meta, source: content };
    });
    const page = mapper[unique] || { title: 'NOT FOUND', text: '404', type: 'toml/schema' };
    const { layout, type, source, url: sourceUrl, ...schema } = page;
    console.log('page schema:', unique, mapper);
    return (
        <div className={styles.root}>
            <Helmet>
                <title>{page.title} - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            {type === 'toml/schema' ? renderer(Object.assign({ component: 'div' }, schema)) : <MarkdownRender content={source} />}
        </div>
    );
};


export function SchemaPage() {
    const { unique } = useParams();
    return (
        <Suspense fallback={<Loading />}>
            <SchemaRenderer unique={unique} />
        </Suspense>
    );
};