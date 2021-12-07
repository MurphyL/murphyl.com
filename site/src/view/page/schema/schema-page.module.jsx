import React from 'react';
import { useRecoilValue } from 'recoil';

import { useDocumentTitle } from 'plug/hooks';

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';
import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";


import renderer from 'plug/extra/schema-options.jsx';

import styles from './schema-page.module.css';

export default function SchemaRenderer({ unique }) {
    const pages = useRecoilValue(callGithubAPI({
        key: 'query-issue-comments',
        ghp_labels: `X-PAGE`,
        path: '$.data.repository.issues.nodes'
    }));
    const mapper = {};
    (pages || []).forEach(({ body, ...info }) => {
        const { content, ...meta } = parseMarkdown(body);
        mapper[meta.unique] = { ...info, ...meta, source: content };
        if (meta.version) {
            mapper[`${meta.unique}-${meta.version}`] = mapper[meta.unique];
        }
    });
    const page = mapper[unique] || { title: 'NOT FOUND', text: '404', type: 'toml/schema' };
    useDocumentTitle(page.title);
    const { layout, type, source, url: sourceUrl, ...schema } = page;
    console.log('page schema:', unique, mapper);
    return (
        <div className={styles.root}>
            {type === 'toml/schema' ? renderer(schema) : <MarkdownViewer code={source} />}
        </div>
    );
};