import React, { Fragment, Suspense } from 'react';
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import ReactJsonSchema from 'react-json-schema';

import { Loading } from 'plug/extra/status/status.module.jsx';

import MarkdownRender from 'plug/extra/markdown_render.jsx';
import SiteLayout from 'plug/layout/site-layout/site-layout.module.jsx';

import { callGithubAPI } from 'plug/extra/rest_utils.jsx';
import { parseMarkdown, parseTOML } from 'plug/extra/rest_utils.jsx';

import options from 'plug/extra/schema_options.jsx';

import styles from './schema_page.module.css';

const view = new ReactJsonSchema();

view.setComponentMap({ ...options } || {});

export function SchemaRenderer({ unique, disableLayout }) {
    const { version } = useParams();
    const pages = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: `X-PAGE`,
        path: 'data.repository.issues.nodes'
    }));
    const alias = {};
    const mapper = {};
    (pages || []).forEach(page => {
        const { meta, content } = parseMarkdown(page.body);
        const keys = [meta.unique, meta.version].join('/');
        alias[meta.unique] =keys;
        mapper[keys] = { ...page, ...meta, source: content };
    });
    const pageUnique = [unique, version].join('/');
    const page = mapper[pageUnique] || mapper[alias[unique]] || { title: '404', type: 'toml/schema' };
    console.log('page schema:', pageUnique, alias, mapper, page.layout);
    const PageLayout = (!disableLayout && options[page.layout]) ? options[page.layout] : Fragment;
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
};

export function SchemaComponent() {
    const { unique } = useParams();
    const DemoComponent = options[unique] || (() => <b>Nothing</b>);
    return (
        <div className={styles.demo}>
            <h3>component - {unique}</h3>
            <div className={styles.demo_board}>
                <DemoComponent role="demo" />
            </div>
        </div>
    );
};

export function SchemaView() {
    const { unique } = useParams();
    return (
        <SiteLayout>
            <Suspense fallback={<Loading />}>
                <SchemaRenderer unique={unique} disableLayout={true} />
            </Suspense>
        </SiteLayout>
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