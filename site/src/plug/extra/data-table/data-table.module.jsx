import React, { Fragment, useEffect, useState } from "react";

import classNames from 'classnames';

import styles from './data-table.module.css';

export function Column() {
    return null;
};

export default function Instance({ className, children, type, data, filter }) {
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        if (React.Children.count(children) === 0) {
            return;
        }
        const tableColumns = [];
        (children || []).forEach(({ key, type, props }, index) => {
            if (type === Column) {
                tableColumns.push({ index, key, ...props });
            }
        });
        setColumns(tableColumns);
    }, [children]);
    console.log(columns);
    return (
        <table className={classNames(styles.instance, styles[type], className)}>
            {(columns && columns.length > 0) ? (
                <Fragment>
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{column.name || column.key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(data || []).map((row, rowIndex) => (
                            <tr key={rowIndex}></tr>
                        ))}
                    </tbody>
                </Fragment>
            ) : (
                <tbody><tr><td>必须添加数据列</td></tr></tbody>
            )}
        </table>
    );
};

Instance.displayName = 'DataTable.Instance';

export function DataFrame({ className, children, type }) {
    return (
        <Instance className={classNames(styles.frame, styles[type], className)}>{children}</Instance>
    );
};

DataFrame.displayName = 'DataTable.Frame';