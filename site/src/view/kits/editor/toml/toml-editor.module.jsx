import React, { Fragment, useEffect, useState } from "react";

import { Helmet } from 'react-helmet-async';

import MonacoEditor from "@monaco-editor/react";
import JSONViewer from 'react-json-view';

import { parseTOML } from 'plug/extra/rest_utils.jsx';

import toast, { Toaster } from 'react-hot-toast';

import styles from './toml-editor.module.css';

const jsonViewerOptions = {
    style: {
        fontSize: '14px'
    },
    onAdd: false,
    onEdit: false,
    onDelete: false,
    collapsed: false,
    iconStyle: 'circle',
    shouldCollapse: false,
    enableClipboard: false,
    displayDataTypes: false,
    displayObjectSize: false
};

const tomlEditorOptions = {
    options: {
        codeLens: false,
        contextmenu: false
    },
    loading: '编辑器正在初始化……'
};

export default function TomlEditor() {
    const [toml, setTOML] = useState('# 好像暂时无法高亮');
    const [json, setJSON] = useState({});
    useEffect(() => {
        toast.dismiss();
        try {
            setJSON(parseTOML(toml));
        } catch {
            toast.error('渲染 TOML 出错！');
        }
    }, [toml]);
    return (
        <Fragment>
            <Helmet>
                <title>TOML 编辑器 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>
                <div className={styles.toml_editor}>
                    <MonacoEditor {...tomlEditorOptions} defaultValue={toml} onChange={setTOML} />
                </div>
                <div className={styles.json_viewer}>
                    <JSONViewer {...jsonViewerOptions} src={json} />
                </div>
                <Toaster position="bottom-left" />
            </div>
        </Fragment>
    );
}