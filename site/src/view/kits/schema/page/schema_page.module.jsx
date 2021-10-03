import React, { Fragment, Suspense } from 'react';
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import { get as pathGet } from 'object-path';
import ReactJsonSchema from 'react-json-schema';

import { Loading } from 'plug/extra/status/status.module.jsx';

import options from 'plug/extra/schema_options.jsx';
import MarkdownRender from 'plug/extra/markdown/markdown.module.jsx';

import { callGithubAPI } from 'plug/extra/rest_utils.jsx';
import { parseMarkdown, parseTOML } from 'plug/extra/rest_utils.jsx';

import styles from './schema_page.module.css';

const view = new ReactJsonSchema();

function SchemaPage({ children }) {
    return (
        <div className={styles.page}>{children}</div>
    );
}

view.setComponentMap({ ...options, SchemaPage } || {});

export function SchemaRenderer({ unique }) {
    const { version } = useParams();
    const fetched = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: `X-PAGE`,
    }));
    const mapper = {};
    (pathGet(fetched || {}, 'data.repository.issues.nodes') || []).forEach(page => {
        const { meta, content } = parseMarkdown(page.body);
        const keys = [meta.unique, meta.version].join('/');
        mapper[keys] = { ...page, ...meta, source: content };
    });
    const pageUnique = [unique, version].join('/');
    const page = mapper[pageUnique] || { title: '404', type: 'toml/schema' };
    console.log('page schema:', pageUnique, mapper, page.layout);
    const PageLayout = options[page.layout] ? options[page.layout] : Fragment;
    return (
        <div className={styles.root}>
            <Helmet>
                <title>{page.title} - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            {page.type === 'toml/schema' ? (
                view.parseSchema(page.source ? parseTOML(page.source) : {
                    component: 'div',
                    className: styles.not_found,
                    text: 'Page not found'
                })
            ) : (
                <PageLayout>
                    <MarkdownRender content={page.source} />
                </PageLayout>
            )}
        </div>
    );
}

export function SchemaLoader() {
    const { unique } = useParams();
    return (
        <Suspense fallback={<Loading />}>
            <SchemaRenderer unique={unique} />
        </Suspense>
    );
}