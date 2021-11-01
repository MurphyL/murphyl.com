import React, { Fragment } from 'react';

import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';

import { Helmet } from 'react-helmet-async';
import { get as pathGet } from 'object-path';

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

import DynamicTable from 'plug/extra/dynamic/table/dynamic-table.module';
import { parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './dynamic-page.module.css';

const linkOptions = {
    target: '_blank',
    rel: 'noopener noreferrer'
};

const columns = [{
    name: '模块',
    path: 'unique',
    formater: (value, row) => {
        let unique = value;
        const labels = (pathGet(row, 'labels.nodes') || []).map(({ name }) => name);
        if (labels.includes('X-TOPIC')) {
            return (
                <a href={`/topics/${unique}`} title={row.title} {...linkOptions}>{unique}</a>
            );
        } else {
            let url = `/page/schema/${row.unique}`;
            if (row.version) {
                url += `-${row.version}`;
                unique += ` - ${row.version}`;
            }
            return (
                <a href={url} title={row.title} {...linkOptions}>{unique}</a>
            );
        }

    }
}, {
    name: '标签',
    path: 'labels.nodes',
    align: 'center',
    formater: (value) => value.map(({ name }) => name).join('，')
}, {
    name: '类型',
    path: 'type',
    align: 'center',
}, {
    name: '发布时间',
    path: 'publishedAt',
    align: 'center',
    formater: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}, {
    name: '操作',
    path: 'url',
    align: 'center',
    formater: (value) => (<a href={value} target="_blank" rel="noopener noreferrer">编辑</a>)
}];

export default function DynamicPage() {
    const pages = useRecoilValue(callGithubAPI({
        key: 'query-issue-comments',
        ghp_labels: [`X-PAGE`, `X-TOPIC`],
        path: 'data.repository.issues.nodes'
    })).map(({ body, ...meta }) => ({ ...meta, ...parseMarkdown(body) }));
    return (
        <Fragment>
            <Helmet>
                <title>动态页面 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <DynamicTable className={styles.root} columns={columns} rows={pages} valueGetter={(row, path) => pathGet(row, path)} />
        </Fragment>
    );
}