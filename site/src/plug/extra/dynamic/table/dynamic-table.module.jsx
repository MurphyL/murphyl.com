import React, { Fragment } from "react";

import classNames from 'classnames';

import { get as pathGet } from 'object-path';

import styles from './dynamic-table.module.css';

const tableOptions = {
    cellPadding: 0,
    cellSpacing: 0,
};

export default function DataTable({ className, expandable, columns = [], rows = [] }) {
    return (
        <table className={classNames(styles.root, className)} {...tableOptions}>
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
                            {columns.map(({ formater, path }, ci) => {
                                let value = path ? pathGet(row, path) : null;
                                if (formater) {
                                    value = formater(value, row, ci);
                                }
                                return (
                                    <td key={ci} data-path={path}>{value || '-'}</td>
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
    );
}