import React, { useRef } from "react";

import useComponentSize from '@rehooks/component-size';

import { MonacoDiffEditor } from 'react-monaco-editor';

import { useDocumentTitle } from 'plug/hooks';

import styles from './text-differ.module.css';

const editorOptions = {
    fontSize: 18,
    contextmenu: false,
    originalEditable: true,
    fontFamily: 'Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace'
};

export default function DifferenceEditor() {
    const editorWrapper = useRef();
    const { width, height } = useComponentSize(editorWrapper);
    useDocumentTitle('文本比较');
    return (
        <div className={styles.root} ref={editorWrapper}>
            <MonacoDiffEditor options={editorOptions} width={width} height={height} />
        </div>
    );
}