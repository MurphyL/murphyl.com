import React from "react";

import dayjs from 'dayjs';
import { get as pathGet } from 'object-path';

import DataTableComponent from 'react-data-table-component';

import renderSchema from 'plug/extra/schema-options.jsx';

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './issue-comments-table.module.css';

DataTableComponent.displayName = 'DataTableComponent';

function RowExpandable({ data }) {
    return (
        <div className={styles.expandable}>
            <MarkdownViewer code={data.content || ''} />
        </div>
    );
}

const defaultColumns = [{
    name: 'Module',
    selector: (row) => pathGet(row, 'children'),
    format: (row) => {
        switch(row.type) {
            case 'toml/schema':
                return renderSchema(row);
            default:
                return row.unique || row.id;
        }
    }
}, {
    name: 'Published At',
    selector: (row) => pathGet(row, 'publishedAt'),
    format: (row) => dayjs(pathGet(row, 'publishedAt')).format('YYYY-MM-DD HH:mm:ss')
}, {
    name: 'Description',
    selector: (row) => pathGet(row, 'description'),
}];

export default function IssueCommentsTable({ expandable, columns, comments }) {
    const cols = defaultColumns.concat((columns || []).map(({ name, path }) => ({
        name, selector: (row) => path ? pathGet(row, path) : '-'
    })));
    const nodes = (comments.nodes || []).map(({ body, ...meta }) => {
        return { ...meta, ...parseMarkdown(body) };
    });
    return (
        <div className={styles.root} >
            <DataTableComponent columns={cols} data={nodes} expandableRows={expandable} expandableRowsComponent={RowExpandable} />
        </div>
    );
}