import React, { Fragment, useState } from "react";

import { Helmet } from 'react-helmet-async';

import TOML from '@iarna/toml';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';

import MonacoEditor from 'react-monaco-editor';
import JSONViewer from 'react-json-view';
import { CodeBlock } from '@atlaskit/code';

import styles from './chameleon-editor.module.css';

JSONViewer.displayName = 'JSONViewer';

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

const editorOptions = {
    loading: '编辑器正在初始化……',
    options: {
        codeLens: false,
        contextmenu: false,
        fontFamily: 'Consolas,Monaco,"Andale Mono","Ubuntu Mono",monospace'
    },
};

const viewerOptions = {
    toml2json: {
        editor: 'toml',
        realtime: true,
        render: (code) => {
            try {
                return TOML.parse(code);
            } catch (e) {
                return { error: 'TOML 转 JSON 出错！' };
            }
        },
        toolbar: (value) => (
            <Fragment>
                <button onClick={() => copy(JSON.stringify(value, null, '   '))}>拷贝</button>
            </Fragment>
        ),
    },
    json2toml: {
        editor: 'json',
        realtime: true,
        render: (code) => {
            try {
                return TOML.stringify(JSON.parse(code));
            } catch (e) {
                return '# JSON 转换为 TOML 出错！';
            }
        },
        toolbar: (value) => (
            <Fragment>
                <button onClick={() => copy(value)}>拷贝</button>
            </Fragment>
        ),
    },
    format_json: {
        editor: 'json',
        realtime: true,
        render: (code) => {
            try {
                return JSON.stringify(JSON.parse(code), null, '   ');
            } catch (e) {
                return JSON.stringify({ error: '解析 JSON 出错！' }, null, '   ');
            }
        },
        toolbar: (value) => (
            <Fragment>
                <button onClick={() => copy(JSON.stringify(value, null, '   '))}>拷贝</button>
            </Fragment>
        ),
    },
};

function CodeViewer({ type, code }) {
    switch (type) {
        case 'toml2json':
            return (
                <JSONViewer src={code} {...jsonViewerOptions} />
            );
        case 'json2toml':
            return (
                <CodeBlock language="toml" text={code} />
            );
        case 'format_json':
            return (
                <CodeBlock language="json" text={code} />
            );
        default:
            return (
                <CodeBlock language="toml" text="# 不支持的源码类型" />
            );
    }
}

CodeViewer.displayName = 'CodeViewer';

export default function Chameleon() {
    const [type, setType] = useState('toml2json');
    const [source, setSource] = useState('# 输入内容……');
    const [target, setTarget] = useState(source);
    const onCodeChange = (source) => {
        setSource(source);
        if (viewerOptions[type].realtime) {
            setTarget(source);
        }
    };
    const option = viewerOptions[type];
    if (!option) {
        return (
            <div>不支持的转换器</div>
        );
    }
    const value = option.render(target);
    return (
        <Fragment>
            <Helmet>
                <title>变色龙 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>
                <div className={styles.editor}>
                    <MonacoEditor language={option.editor} {...editorOptions} value={source} onChange={onCodeChange} />
                    <div className={styles.toolbar}>
                        <select className={styles.type} onChange={(e) => setType(e.target.value)}>
                            <option value="toml2json">TOML 转 JSON</option>
                            <option value="json2toml">JSON 转 TOML</option>
                            <option value="format_json">JSON 格式化</option>
                        </select>
                        <button onClick={() => copy(source)}>拷贝</button>
                    </div>
                </div>
                <div className={classNames(styles.viewer, { [styles.wide]: option.wide })}>
                    <CodeViewer type={type} code={value} />
                    <div className={styles.toolbar}>
                        {option.toolbar && option.toolbar(value)}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}