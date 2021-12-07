import React from "react";

import { DiffEditor } from "@monaco-editor/react";

import { useDocumentTitle } from 'plug/hooks';

import styles from './text-differ.module.css';

const editorOptions = {
    loading: '编辑器正在初始化……',
    options: {
        fontSize: 18,
        contextmenu: false,
        originalEditable: true,
        fontFamily: 'Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace'
    }
};

export default function DifferenceEditor() {
    useDocumentTitle('文本比较');
    return (
        <div className={styles.root}>
            <DiffEditor {...editorOptions} />
        </div>
    );
}