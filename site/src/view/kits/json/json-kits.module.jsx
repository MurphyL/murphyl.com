import React, { Fragment, memo, useMemo, useRef, useState } from "react";

import { Link } from "react-router-dom";
import JSONViewer from 'react-json-view';

import { toast, ToastContainer } from 'react-toast';

import kindOf from 'kind-of';
import TOML from '@iarna/toml';
import { csvParse } from 'd3-dsv';
import parseJSON from 'parse-json';
import classNames from "classnames";
import stripJSON from 'strip-json-comments';
import exportFromJSON from 'export-from-json';
import { JSONPath } from 'jsonpath-plus-browser';

import { Json } from "@icons-pack/react-simple-icons";

import { CodeEditor } from 'plug/extra/code/code.module';

import { useDocumentTitle } from 'plug/hooks';

import { NaviTabs } from "plug/dynamic/dynamic.module";
import FormItem from 'plug/extra/form-item/form-input.module';
import SplitView from 'plug/extra/split-view/split-view.module';

import DriftToolbar from 'plug/extra/drift-toolbar/drift-toolbar.module';

import styles from './json-kits.module.css';

/**
 * - https://jsonlint.com/
 * - https://www.npmjs.com/package/flat
 * - https://www.npmjs.com/package/ajv
 * - https://www.npmjs.com/package/parse-json
 * - https://jsonformatter.curiousconcept.com/
 * - https://www.jstoolset.com/json-formatter
 */

const editorSetting = (readOnly) => ({
    readOnly,
    fontSize: 18,
    scrollBeyondLastLine: false,
});

const jsonViewerOptions = {
    style: {
        fontSize: '16px'
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

// console.log(JSONPath({path: '$.options.scrollBeyondLastLine', json: editorSetting, wrap: false }));

const validate = (rows) => {
    toast.hideAll();
    rows.forEach(({ message, startLineNumber, endLineNumber }) => {
        toast.error(`Line ${Array.from(new Set([startLineNumber, endLineNumber])).join('-')}: ${message}`)
    });
};

const logo = (
    <Link to="/" className={styles.logo_link} title="返回首页">
        <Json color="#4E9BCD" />
        <b>JSON 工具集</b>
    </Link>
);

const EXPORT_TYPES = {
    JSON: 'json/json',
    CSV: 'csv/csv',
    TOML: 'txt/toml',
    XML: 'xml/xml',
};

const resolve = (text) => {
    try {
        return parseJSON(stripJSON(text));
    } catch (e) {
        return e.message
    }
};

const stringifyTOML = (data) => {
    try {
        return (kindOf(data) === 'array') ? TOML.stringify({ data }) : TOML.stringify(data);
    } catch (e) {
        return e.message;
    }
};

const stringifyJSON = (data, indent) => {
    if (!data) {
        return '';
    }
    if (kindOf(data) === 'string') {
        return data;
    }
    try {
        return (indent > 0) ? JSON.stringify(data, null, indent) : JSON.stringify(data);
    } catch (e) {
        return e.message;
    }
};

const JSONPathTester = memo(({ exchanger, indent, value }) => {
    const viewerWrapper = useRef();
    const [path, setPath] = useState('$');
    const parsed = useMemo(() => {
        try {
            const source = parseJSON(value);
            if (kindOf(source) === 'string') {
                return source;
            }
            return JSONPath({ path, json: source, wrap: false });
        } catch (e) {
            return e.message;
        }
    }, [value, path]);
    return (
        <div className={styles.jp_tester}>
            <div className={styles.jsonpath}>
                <textarea defaultValue={path} onChange={e => setPath(e.target.value)} placeholder="输入 JSONPath 抽取数据……" />
            </div>
            <div className={styles.board} ref={viewerWrapper}>
                <CodeEditor language={(kindOf(parsed) === 'string') ? 'text' : 'json'} options={editorSetting(true)} value={stringifyJSON(parsed, indent)} />
            </div>
            <DriftToolbar className={styles.toolbar}>
                <button onClick={() => (kindOf(exchanger) === 'function') && exchanger(stringifyJSON(parsed, indent))}>&lt; Send</button>
                <button>Copy</button>
            </DriftToolbar>
        </div>
    );
});

JSONPathTester.displayName = 'JSONPathTester';

export default function JSONKits() {
    useDocumentTitle('JSON 工具集');
    const fileInstance = useRef();
    const exportRule = useRef();
    const editorWrapper = useRef();
    const viewerWrapper = useRef();
    const [value, setValue] = useState('{}');
    const [indent, setIndent] = useState(4);
    const editor = useMemo(() => (
        <div className={styles.editor} data-label="Source" ref={editorWrapper}>
            <CodeEditor language="json" onValidate={validate} value={value} onChange={setValue} />
            <DriftToolbar className={styles.toolbar}>
                <Json color="#4E9BCD" />
                <button onClick={() => { setValue(stringifyJSON(resolve(value), indent)) }}>Beautify</button>
                <input type="number" defaultValue={indent} onChange={e => setIndent(parseInt(e.target.value))} title="缩进" />
                <button onClick={() => { setValue(stringifyJSON(resolve(value))) }}>Minify</button>
                <button>Copy</button>
                <FormItem type="file" ref={fileInstance} name="Read from file" accept=".json,.toml,.csv" onChange={(filename) => {
                    if (!filename || !fileInstance || !fileInstance.current || fileInstance.current.length === 0) {
                        return;
                    }
                    const reader = new FileReader();
                    // TODO 解析 CSV/TOML/YAML
                    reader.readAsText(fileInstance.current.files[0]);
                    reader.onload = () => {
                        if (filename.endsWith('.json')) {
                            setValue(reader.result);
                        } else if (filename.endsWith('.csv')) {
                            try {
                                setValue(stringifyJSON(csvParse(reader.result), indent));
                            } catch (e) {
                                toast.error(`解析 CSV 文件出错：${e.message}`)
                            }
                        } else if (filename.endsWith('.toml')) {
                            try {
                                setValue(stringifyJSON(TOML.parse(reader.result), indent));
                            } catch (e) {
                                toast.error(`解析 TOML 文件出错：${e.message}`);
                            }
                        }
                    };
                }} />
                <button onClick={() => {
                    if (!exportRule || !exportRule.current) {
                        return;
                    }
                    const [exportType, extension] = exportRule.current.value.split('/');
                    let data = resolve(value);
                    if (extension === 'toml') {
                        data = stringifyTOML(data);
                    }
                    try {
                        exportFromJSON({ data, fileName: `${extension}-${Date.now()}`, exportType, extension });
                    } catch (e) {
                        toast.error(`导出${extension.toUpperCase()}数据出错：${e.message}`)
                    }
                }}>Export</button>
                <select defaultValue={EXPORT_TYPES.JSON} ref={exportRule}>
                    {Object.entries(EXPORT_TYPES).map(([key, info], index) => (
                        <option key={index} value={info}>{key}</option>
                    ))}
                </select>

            </DriftToolbar>
        </div>
    ), [value, indent]);
    const parsed = resolve(value);
    return (
        <Fragment>
            <NaviTabs className={styles.root} logo={logo}>
                <div className={styles.item} name="JSON Editor">
                    <SplitView sizes={[75, 25]} minSize={[600, 400]}>
                        {editor}
                        <div className={styles.viewer} ref={viewerWrapper}>
                            {(typeof (parsed) === 'string') ? (
                                <CodeEditor language="text" options={{ readOnly: true }} value={parsed} />
                            ) : (
                                <JSONViewer {...jsonViewerOptions} src={parsed} />
                            )}
                        </div>
                    </SplitView>
                </div>
                <div className={classNames(styles.item)} name="JSONPath Tester">
                    <SplitView sizes={[40, 60]} minSize={[400, 500]}>
                        {editor}
                        <div>
                            <JSONPathTester value={value} indent={indent} exchanger={setValue} />
                        </div>
                    </SplitView>
                </div>
                <div className={classNames(styles.item)} name="JSON -> TOML">
                    <SplitView sizes={[50, 50]} minSize={[500, 500]}>
                        {editor}
                        <div className={styles.viewer} ref={viewerWrapper}>
                            <CodeEditor language="toml" options={{ readOnly: true }} value={(kindOf(parsed) === 'string') ? parsed : stringifyTOML(parsed)} />
                        </div>
                    </SplitView>
                </div>
            </NaviTabs>
            <ToastContainer position="bottom-left" />
        </Fragment>
    );
}