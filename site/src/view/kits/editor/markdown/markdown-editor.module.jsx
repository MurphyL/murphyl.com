import React, { Fragment, useState } from "react";

import { Helmet } from 'react-helmet-async';

import MonacoEditor from 'react-monaco-editor';

import { MarkdownViewer } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './markdown-editor.module.css';

const editorOptions = {
    loading: '编辑器正在初始化……',
    language: 'markdown',
    options: {
        codeLens: false,
        contextmenu: false,
        fontFamily: 'Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace'
    },
    
};

export default function MarkdownEditor() {
    const [text, setText] = useState('> 请输入内容……');
    return (
        <Fragment>
            <Helmet>
                <title>编辑 Markdown - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>
                <div className={styles.editor}>
                    <MonacoEditor {...editorOptions} value={text} onChange={setText} />
                </div>
                <div className={styles.viewer}>
                    <MarkdownViewer code={text} />
                </div>
            </div>
        </Fragment>
    );
}