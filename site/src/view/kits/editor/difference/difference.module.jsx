import React, { Fragment } from "react";

import { Helmet } from 'react-helmet-async';

import { MonacoDiffEditor } from "react-monaco-editor";
// import { DiffEditor as MonacoDiffEditor } from "@monaco-editor/react";

import styles from './difference.module.css';

const editorOptions = {
    options: {
        contextmenu: false,
        originalEditable: true
    },
    loading: '编辑器正在初始化……'
};

export default function DifferenceEditor() {
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