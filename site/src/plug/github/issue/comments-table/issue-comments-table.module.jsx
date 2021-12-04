import React from "react";

import dayjs from 'dayjs';

import { JSONPath } from 'jsonpath-plus-browser';

import DynamicTable from 'plug/dynamic/table/dynamic-table.module';

// import DynamicTable from '@murphyl/drc-table';

import renderSchema from 'plug/extra/schema-options.jsx';

import { parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './issue-comments-table.module.css';

const defaultColumns = [{
    name: 'Module',
    path: '$.unique',
    formater: (value, row) => {
        switch (row.type) {
            case 'toml/schema':
                return renderSchema(row);
            default:
                return value || row.unique || row.id;
        }
    }
}, {
    name: 'Published At',
    path: '$.publishedAt',
    formater: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}, {
    name: 'Description',
    path: '$.description',
}];

export default function IssueCommentsTable({ columns, comments }) {
    const cols = defaultColumns.concat(columns || []);
    const nodes = (comments.nodes || []).map(({ body, ...meta }) => {
        return { ...meta, ...parseMarkdown(body) };
    });
    return (
        <DynamicTable className={styles.root} value={(row, path) => JSONPath({json: row, path: path, wrap: false})} columns={cols} rows={nodes} />
    );
}