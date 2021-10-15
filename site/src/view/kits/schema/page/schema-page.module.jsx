import React, { Fragment, Suspense } from 'react';
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import ReactJsonSchema from 'react-json-schema';

import { Loading } from 'plug/extra/status/status.module.jsx';

import MarkdownRender from 'plug/extra/markdown_render.jsx';

import { callGithubAPI } from 'plug/extra/rest_utils.jsx';
import { parseMarkdown } from 'plug/extra/rest_utils.jsx';

import options from 'plug/extra/schema_options.jsx';

import styles from './schema-page.module.css';

const view = new ReactJsonSchema();

view.setComponentMap({ ...options } || {});

export function SchemaRenderer({ unique, disableLayout }) {
    const pages = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: `X-PAGE`,
        path: 'data.repository.issues.nodes'
    }));
    const mapper = {};
    (pages || []).forEach(({ body, ...info }) => {
        const { meta, content } = parseMarkdown(body);
        mapper[meta.unique] = { ...info, ...meta, source: content };
    });
    const page = mapper[unique] || { title: 'NOT FOUND', text: '404', type: 'toml/schema' };
    const { layout, type, title, source, url: sourceUrl, ...schema } = page;
    console.log('page schema:', unique, mapper);
    const PageLayout = (!disableLayout && options[layout]) ? options[layout] : Fragment;
    return (
        <div className={styles.root}>
            <Helmet>
                <title>{title} - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <PageLayout>
                {type === 'toml/schema' ? view.parseSchema(Object.assign({ component: 'div' }, schema)) : <MarkdownRender content={source} />}
            </PageLayout>
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
    const { layout, unique } = useParams();
    const Layout = options[layout] || Fragment;
    return (
        <Layout>
            <Suspense fallback={<Loading />}>
                <SchemaRenderer unique={unique} disableLayout={true} />
            </Suspense>
        </Layout>
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