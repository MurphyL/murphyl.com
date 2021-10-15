import React, { Fragment } from "react";

import { Helmet } from 'react-helmet-async';

import { DiffEditor as MonacoDiffEditor } from "@monaco-editor/react";

import styles from './diff-editor.module.css';

const editorOptions = {
    options: {
        contextmenu: false,
        originalEditable: true
    },
    loading: '编辑器正在初始化……'
};

export default function DiffEditor() {
    return (
        <Fragment>
            <Helmet>
                <title>文本比较 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>
                <MonacoDiffEditor {...editorOptions} />
            </div>
        </Fragment>
    );
}