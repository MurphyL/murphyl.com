import React from "react";

import { get as pathGet } from 'object-path';

import { CodeBlock } from '@atlaskit/code';

import DataTableComponent from 'react-data-table-component';

import styles from './dynamic-table.module.css';

function RowExpandable({ data }) {
    return (
        <div className={styles.expandable}>
            <CodeBlock language="json" text={JSON.stringify(data, null, 2)} />
        </div>
    );
}

export default function DataTable({ columns, rows = [] }) {
    const cols = (columns || []).map(({ name, path }) => ({
        name, selector: (row) => pathGet(row, path)
    }));
    const options = { columns: cols, data: rows, fixedHeader: true, expandableRows: true };
    return (
        <div className={styles.root}>
            <DataTableComponent {...options} expandableRowsComponent={RowExpandable} />
        </div>
    );
}