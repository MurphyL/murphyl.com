import React, { Fragment, useState } from "react";

import { useParams } from "react-router-dom";

import { Helmet } from 'react-helmet-async';

import TOML from '@iarna/toml';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';

import JSONViewer from 'react-json-view';
import MonacoEditor from 'react-monaco-editor';
import { CodeBlock } from '@atlaskit/code';

import styles from './chameleon-editor.module.css';

JSONViewer.displayName = 'JSONViewer';

const jsonViewerOptions = {
    style: {
        fontSize: '14px'
    },
    name: null,
    onAdd: false,
    onEdit: false,
    onDelete: false,
    collapsed: false,
    iconStyle: 'circle',
    quotesOnKeys: false,
    shouldCollapse: false,
    enableClipboard: false,
    displayDataTypes: false,
    displayObjectSize: false
};

const editorOptions = {
    loading: '编辑器正在初始化……',
    options: {
        fontSize: 14,
        codeLens: false,
        contextmenu: false,
        formatOnPaste: true,
        renderFinalNewline: true,
        snippetSuggestions: false,
        renderWhitespace: 'selection',
        fontFamily: 'Menlo,Monaco,Consolas,Andale Mono,lucida console,Courier New,monospace'
    },
};

const createEditorOptions = (type) => {
    const options = editorOptions;
    switch (type) {
        case 'toml2json':
            options['language'] = 'toml';
            break;
        case 'json2toml':
        case 'json_editor':
            options['language'] = 'json';
            break;
        default:
    }
    return options;
};

const convert = (type, code) => {
    switch (type) {
        case 'toml2json':
            try {
                return TOML.parse(code);
            } catch (e) {
                return { error: 'TOML 转 JSON 出错！' };
            }
        case 'json2toml':
            try {
                return TOML.stringify(JSON.parse(code));
            } catch (e) {
                return '# JSON 转换为 TOML 出错！';
            }
        case 'json_editor':
            try {
                return JSON.parse(code);
            } catch (e) {
                return { error: '解析 JSON 出错！' };
            }
        default:
    }
};

function ViewBoard({ type, code }) {
    switch (type) {
        case 'toml2json':
        case 'json_editor':
            return (
                <JSONViewer src={code} {...jsonViewerOptions} />
            );
        case 'json2toml':
            return (
                <Fragment>
                    <CodeBlock language="toml" text={code} />
                    <div className={styles.toolbar}>
                    </div>
                </Fragment>
            );
        default:
    }
}

ViewBoard.displayName = 'ViewBoard';

function Chameleon() {
    const { unique } = useParams();
    const [type, setType] = useState(unique || 'toml2json');
    const [source, setSource] = useState('# 输入内容……');
    return (
        <Fragment>
            <Helmet>
                <title>变色龙 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>
                <div className={styles.editor}>
                    <MonacoEditor {...createEditorOptions(type)} value={source} onChange={setSource} />
                    <div className={styles.toolbar}>
                        <select defaultValue={type} onChange={(e) => setType(e.target.value)}>
                            <option value="toml2json">TOML 编辑器</option>
                            <option value="json_editor">JSON 编辑器</option>
                            <option value="json2toml">JSON 转 TOML</option>
                        </select>
                        <button onClick={() => copy(source)}>拷贝</button>
                        {(type === 'json2toml' || type === 'json_editor') && (
                            <button onClick={() => setSource(JSON.stringify(JSON.parse(source), null, 4))}>格式化</button>
                        )}
                    </div>
                </div>
                <div className={classNames(styles.viewer)}>
                    <ViewBoard type={type} code={convert(type, source)} />
                </div>
            </div>
        </Fragment>
    );
}

export default function ChameleonX() {
    const { unique } = useParams();
    if (unique === 'x') {
        return 'x';
    }
    return (
        <Chameleon />
    );
}