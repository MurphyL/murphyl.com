import React, { Fragment } from "react";

import { Helmet } from 'react-helmet-async';

import { MonacoDiffEditor } from "react-monaco-editor";

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