import classNames from "classnames";
import React, { Fragment } from "react";

import styles from './dynamic-table.module.css';

const tableOptions = {
    cellPadding: 0,
    cellSpacing: 0,
};

const defaultValueGetter = (row, path) => row[path];

export default function DataTable({ className, valueGetter = defaultValueGetter, expandable, columns = [], rows = [] }) {
    return (
        <div className={classNames(styles.root, className)}>
            <table {...tableOptions}>
                <thead>
                    <tr>
                        {columns.map(({ name, path }, index) => (
                            <th key={index} data-path={path}>{name || '-'}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {(rows || []).map((row, ri) => (
                        <Fragment key={ri}>
                            <tr className={[styles[`row_${(ri % 2) ? 'odd' : 'even'}`]]}>
                                {columns.map(({ formater, path, align }, ci) => {
                                    let value = path ? valueGetter(row, path) : null;
                                    if (formater) {
                                        value = formater(value, row, ci);
                                    }
                                    const options = {
                                        className: classNames(styles[align])
                                    };
                                    return (
                                        <td {...options} key={ci} data-path={path}>{value || '-'}</td>
                                    );
                                })}
                            </tr>
                            {expandable && (
                                <tr data-row-index={ri}>
                                    <td colSpan={columns.length}>11</td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export function DynamicTable({ className, columns = [], data = [], hideHeaders = false, nullValuePlaceholder='-' }) {
    if (!Array.isArray(columns)) {
        return (
            <span>数据表字段配置错误</span>
        );
    }
    if (columns.length === 0) {
        return (
            <span>数据表字段个数必须大于0</span>
        );
    }
    if (!Array.isArray(data)) {
        return (
            <span>数据值不是数组</span>
        );
    }
    return (
        <table className={classNames(styles.root, className)}>
            {!hideHeaders && (
                <thead>
                    <tr>
                        {columns.map(({ name }, index) => (
                            <th key={index}>{name || nullValuePlaceholder}</th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody>
                {(data.length > 0) ? (
                    data.map((row, ri) => (
                        <tr key={ri} data-row-number={ri + 1}>
                            {columns.map(({ name }, ci) => (
                                <td key={ci}>{row[name] || nullValuePlaceholder}</td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length}>
                            <div style={{ textAlign: 'center', lineHeight: '5rem' }}>暂无数据</div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}