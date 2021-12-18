import React, { Fragment, useEffect, useState } from "react";

import kindOf from 'kind-of';
import classNames from 'classnames';

import styles from './data-table.module.css';

export function Column() {
    return null;
};

// 标替 - https://www.w3school.com.cn/tags/tag_caption.asp
// 表头 - https://www.w3school.com.cn/tags/tag_colgroup.asp
export default function Instance({ className, title, type, columns, data }) {
    return (
        <table className={classNames(styles.instance, styles[type], className)}>
            {title && <caption>{title}</caption>}
            {(columns && columns.length > 0) && (
                <thead>
                    <tr role="row">
                        {columns.map((column, index) => (
                            <th key={index} role="columnheader">{column.name || column.key}</th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody>
                {(data && data.length > 0) ? (
                    (data || []).map((row, rowIndex) => (
                        <tr key={rowIndex} role="row">
                            {(kindOf(row) === 'array')? row.map((column, columnIndex) => (
                                <td key={columnIndex} row="cell">{column}</td>
                            )) : (
                                <td row="cell">1</td>
                            ) }
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td>No rows to display.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

Instance.displayName = 'DataTable.Instance';

export function DataFrame({ className, type, data }) {
    return (
        <Instance className={classNames(styles.frame, styles[type], className)} data={data} />
    );
};