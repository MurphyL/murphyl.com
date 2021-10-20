import React from "react";

import styles from './dynamic-table.module.css';

export default function DynamicTable({ columns, rows }) {
    console.log(columns, rows);
    return (
        <table className={styles.root}>
            <thead>
                <tr>
                    {(columns || []).map((col, index) => (
                        <th key={index}>{col.label || '未命名'}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {(rows || []).map((row, ri) => (
                    <tr key={ri}>
                        {(columns || []).map((col, ci) => (
                            <td key={ci}>{row[col.unique]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}