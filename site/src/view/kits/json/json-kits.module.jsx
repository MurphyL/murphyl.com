import React, { Fragment, memo, useMemo, useRef, useState } from "react";

import { Link } from "react-router-dom";
import JSONViewer from 'react-json-view';

import { toast, ToastContainer } from 'react-toast';

import kindOf from 'kind-of';
import TOML from '@iarna/toml';
import parseJSON from 'parse-json';
import classNames from "classnames";
import { JSONPath } from 'jsonpath-plus-browser';

import Editor from "@monaco-editor/react";
import { Json } from "@icons-pack/react-simple-icons";

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
    loading: '正在初始化……',
    options: {
        readOnly,
        fontSize: 18,
        scrollBeyondLastLine: false,
    }
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

const resolve = (text) => {
    try {
        return parseJSON(text);
    } catch (e) {
        return e.message
    }
};

const stringifyTOML = (data) => {
    if (kindOf(data) === 'object') {
        try {
            return TOML.stringify(data);
        } catch (e) {
            return e.message;
        }
    } else {
        return `Can not stringify JSON data: ${JSON.stringify(data, null, 4)}`
    }
};

const stringifyJSON = (data, indent) => {
    try {
        return (indent > 0) ? JSON.stringify(data, null, indent) : JSON.stringify(data);
    } catch (e) {
        return e.message;
    }
};

const JSONPathTester = memo(({ indent, value }) => {
    const [path, setPath] = useState('$');
    const parsed = useMemo(() => {
        try {
            return JSONPath({ path: ((path.trim().length > 0) ? path : '$'), json: parseJSON(value), wrap: false });
        } catch (e) {
            return e.message;
        }
    }, [value, path]);
    return (
        <div className={styles.jp_tester}>
            <div className={styles.jsonpath}>
                <textarea defaultValue={path} onChange={e => setPath(e.target.value)} placeholder="输入 JSONPath 抽取数据……" />
            </div>
            <div className={styles.board}>
                <Editor language={(kindOf(parsed) === 'string') ? 'text' : 'json'} {...editorSetting(true)} value={(kindOf(parsed) === 'string') ? parsed : stringifyJSON(parsed, indent)} />
            </div>
            <DriftToolbar className={styles.toolbar}>
                <button>Copy</button>
            </DriftToolbar>
        </div>
    );
});

JSONPathTester.displayName = 'JSONPathTester';

const logo = (
    <Link to="/" className={styles.logo_link} title="返回首页">
        <Json color="#4E9BCD" />
        <b>JSON 工具集</b>
    </Link>
);

export default function JSONKits() {
    useDocumentTitle('JSON 工具集');
    const file = useRef();
    const [value, setValue] = useState('{}');
    const [indent, setIndent] = useState(4);
    const editor = useMemo(() => (
        <div className={styles.editor}>
            <Editor language="json" {...editorSetting(false)} onValidate={validate} value={value} onChange={setValue} />
            <DriftToolbar className={styles.toolbar}>
                <Json color="#4E9BCD" />
                <button onClick={() => { setValue(stringifyJSON(resolve(value), indent)) }}>Beautify</button>
                <input type="number" defaultValue={indent} onChange={e => setIndent(parseInt(e.target.value))} title="缩进" />
                <button onClick={() => { setValue(stringifyJSON(resolve(value))) }}>Minify</button>
                <button>Copy</button>
                <FormItem type="file" ref={file} name="选择文件" accept=".json,.toml" onChange={(filename) => {
                    if (!filename || !file || !file.current || file.current.length === 0) {
                        return;
                    }
                    const reader = new FileReader();
                    // TODO 解析 CSV/TOML/YAML
                    reader.readAsText(file.current.files[0]);
                    reader.onload = () => {
                        if (filename.endsWith('.json')) {
                            setValue(reader.result);
                        } else if (filename.endsWith('.toml')) {
                            try {
                                setValue(stringifyJSON(TOML.parse(reader.result), indent));
                            } catch (e) {
                                toast.error(`解析 TOML 文件出错：${e.message}`)
                            }
                        }
                    };
                }} />
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
                        <div className={styles.viewer}>
                            {(typeof (parsed) === 'string') ? (
                                <Editor language="text" {...editorSetting(true)} value={parsed} />
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
                            <JSONPathTester value={value} indent={indent} />
                        </div>
                    </SplitView>
                </div>
                <div className={classNames(styles.item)} name="JSON -> TOML">
                    <SplitView sizes={[50, 50]} minSize={[500, 500]}>
                        {editor}
                        <div className={styles.viewer}>
                            <Editor language="toml" {...editorSetting(true)} value={(kindOf(parsed) === 'string') ? parsed : stringifyTOML(parsed)} />
                        </div>
                    </SplitView>
                </div>
            </NaviTabs>
            <ToastContainer position="bottom-left" />
        </Fragment>
    );
}