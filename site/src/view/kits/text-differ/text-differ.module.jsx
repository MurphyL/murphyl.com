import React from "react";

import { DiffEditor } from 'plug/extra/code/code.module';

import { useDocumentTitle } from 'plug/hooks';

import styles from './text-differ.module.css';


export default function DifferenceEditor() {
    useDocumentTitle('文本比较');
    return (
        <div className={styles.root}>
            <DiffEditor />
        </div>
    );
}