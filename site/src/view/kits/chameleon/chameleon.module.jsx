import React, { Fragment, useState } from "react";

import { Helmet } from 'react-helmet-async';

import copy from 'copy-to-clipboard';

import MonacoEditor from "@monaco-editor/react";
import JSONViewer from 'react-json-view';

import classNames from 'classnames';

import { CodeBlock } from '@atlaskit/code';

import renderer from 'plug/extra/schema-options.jsx';

import { ErrorBoundary } from 'plug/extra/status/status.module.jsx';

import { parseTOML, stringifyTOML } from 'plug/extra/rest-utils.jsx';

import styles from './chameleon.module.css';

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
        contextmenu: false
    },
};

const viewerOptions = {
    toml2json: {
        source: 'toml',
        realtime: true,
        render: (code) => {
            try {
                return parseTOML(code);
            } catch (e) {
                return { error: 'TOML 转 JSON 出错！' };
            }
        }
    },
    json2toml: {
        source: 'json',
        realtime: true,
        render: (code) => {
            try {
                return stringifyTOML(JSON.parse(code));
            } catch (e) {
                return 'JSON 转换为 TOML 出错！';
            }
        }
    },
    toml2jsx: {
        source: 'toml',
        wide: true,
        render: (code) => {
            try {
                return Object.assign({ component: 'div' }, parseTOML(code));
            } catch (e) {
                return 'TOML 转换为 JSX 出错！';
            }
        }
    },
    json2jsx: {
        source: 'json',
        wide: true,
        render: (code) => {
            try {
                return Object.assign({ component: 'div' }, JSON.parse(code));
            } catch (e) {
                return 'JSON 转换为 JSX 出错！';
            }
        }
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
        case 'toml2jsx':
        case 'json2jsx':
            return (
                <ErrorBoundary>
                    {renderer(code)}
                </ErrorBoundary>
            );
        default:
            return (
                <CodeBlock language="toml" text="# 不支持的源码类型" />
            );
    }
}

CodeViewer.displayName = 'CodeViewer';

export default function TOMLConverter() {
    const [type, setType] = useState('toml2json');
    const [source, setSource] = useState('# 好像暂时无法高亮');
    const [target, setTarget] = useState(source);
    const onCodeChange = (source) => {
        setSource(source);
        if (viewerOptions[type].realtime) {
            setTarget(source);
        }
    };
    const option = viewerOptions[type];
    return (
        <Fragment>
            <Helmet>
                <title>TOML 编辑器 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>
                <div className={styles.editor}>
                    <MonacoEditor language={option.source} {...editorOptions} value={source} onChange={onCodeChange} />
                    <div className={styles.toolbar}>
                        <select className={styles.type} onChange={(e) => setType(e.target.value)}>
                            <option value="toml2json">TOML 转 JSON</option>
                            <option value="json2toml">JSON 转 TOML</option>
                            <option value="toml2jsx">TOML 转 JSX</option>
                            <option value="json2jsx">JSON 转 JSX</option>
                        </select>
                        <button onClick={() => copy(source)}>拷贝</button>
                        <button onClick={() => setTarget(source)}>转换</button>
                    </div>
                </div>
                <div className={classNames(styles.viewer, { [styles.wide]: option.wide })}>
                    <ErrorBoundary>
                        <CodeViewer type={type} code={option.render(target)} />
                    </ErrorBoundary>
                    <div className={styles.toolbar}>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}