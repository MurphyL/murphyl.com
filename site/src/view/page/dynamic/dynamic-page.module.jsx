import React from 'react';

import { useRecoilValue } from 'recoil';

import dayjs from 'dayjs';
import { JSONPath } from 'jsonpath-plus-browser';

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

import DynamicTable from 'plug/dynamic/table/dynamic-table.module';
import { parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './dynamic-page.module.css';

const linkOptions = {
    target: '_blank',
    rel: 'noopener noreferrer'
};

const ts = (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss');

const columns = [{
    name: '模块',
    path: 'title',
    formater: (value, row) => {
        const labels = (JSONPath({json: row, path: '$.labels.nodes', wrap: false}) || []).map(({ name }) => name);
        if (labels.includes('X-TOPIC')) {
            return (
                <a href={`/notebook/${row.unique}`} title={row.title} {...linkOptions}>{value}</a>
            );
        } else {
            let url = `/page/schema/${row.unique}`;
            if (row.version) {
                url += `-${row.version}`;
            }
            return (
                <a href={url} title={row.title} {...linkOptions}>{value}</a>
            );
        }

    }
}, {
    name: '标签',
    path: '$.labels.nodes',
    align: 'center',
    formater: (value) => value.map(({ name }) => name).join('，')
}, {
    name: '类型',
    path: '$.type',
    align: 'center',
}, {
    name: '发布时间',
    path: '$.publishedAt',
    align: 'center',
    formater: (value, row) => {
        return `${ts(value)} / ${ts(row.updatedAt)}`
    }
}, {
    name: '操作',
    path: '$.url',
    align: 'center',
    formater: (value) => (<a href={value} target="_blank" rel="noopener noreferrer">编辑</a>)
}];

export default function DynamicPage() {
    const pages = useRecoilValue(callGithubAPI({
        key: 'query-issue-comments',
        ghp_labels: [`X-PAGE`, `X-TOPIC`],
        path: '$.data.repository.issues.nodes'
    })).map(({ body, ...meta }) => ({ ...meta, ...parseMarkdown(body) }));
    return (
        <DynamicTable className={styles.root} columns={columns} rows={pages} valueGetter={(row, path) => JSONPath({json: row, path, wrap: false})} />
    );
}