import React, { Fragment } from "react";

import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";

import { MonacoDiffEditor } from "react-monaco-editor";

import DriftNavi from 'plug/extra/drift-navi/drift-navi.module';

import styles from './difference-editor.module.css';

const editorOptions = {
    loading: '编辑器正在初始化……',
    options: {
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
            <DriftNavi postion={['bottom', 'left']}>
                <Link to="/">首页</Link>
            </DriftNavi>
        </Fragment>
    );
}