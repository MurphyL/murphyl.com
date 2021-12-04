import React, { Fragment, memo, useMemo, useState } from "react";

import classNames from "classnames";
import TOML from '@iarna/toml';
import parseJson from 'parse-json';
import { JSONPath } from 'jsonpath-plus-browser';

import Editor from "@monaco-editor/react";
import { ToastContainer, toast } from 'react-toast';
import { Json } from "@icons-pack/react-simple-icons";

import JSONViewer from 'react-json-view';

import SplitView from 'plug/extra/split-view/split-view.module';
import { NaviTabs } from "plug/dynamic/dynamic.module";
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

const editorSetting = {
    loading: '正在初始化……',
    options: {
        fontSize: 18,
        scrollBeyondLastLine: false,
    }
};

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
        return parseJson(text);
    } catch (e) {
        return e.message
    }
}

const JSONPathTester = memo(({ indent, value }) => {
    const [path, setPath] = useState('');
    const parsed = useMemo(() => {
        try {
            return JSONPath({ path: (path.trim().length > 0) ? path : '$', json: parseJson(value), wrap: false });
        } catch (e) {
            return e.message;
        }
    }, [value, path]);
    return (
        <div className={styles.jp_tester}>
            <div className={styles.jsonpath}>
                <textarea defaultValue={path} onChange={e => setPath(e.target.value)} />
            </div>
            <div className={styles.board}>
                <Editor language={(typeof parsed === 'string') ? 'text' : 'json'} {...editorSetting} value={(typeof parsed === 'string') ? parsed : JSON.stringify(parsed, null, indent)} />
            </div>
            <DriftToolbar className={styles.toolbar}>
                <button>Copy</button>
            </DriftToolbar>
        </div>
    );
});

JSONPathTester.displayName = 'JSONPathTester';

export default function JSONKits() {
    const [value, setValue] = useState('{}');
    const [indent, setIndent] = useState(4);
    const editor = useMemo(() => (
        <div className={styles.editor}>
            <Editor language="json" {...editorSetting} onValidate={validate} value={value} onChange={setValue} />
            <DriftToolbar className={styles.toolbar}>
                <Json color="#4E9BCD" />
                <button onClick={() => { setValue(JSON.stringify(resolve(value), null, indent)) }}>Beautify</button>
                <input type="number" defaultValue={indent} onChange={e => setIndent(parseInt(e.target.value))} title="缩进" />
                <button onClick={() => { setValue(JSON.stringify(resolve(value))) }}>Minify</button>
                <button>Copy</button>
            </DriftToolbar>
        </div>
    ), [value, indent]);
    const parsed = resolve(value);
    return useMemo(() => (
        <Fragment>
            <NaviTabs className={styles.root} logo={<b>JSON 工具集</b>}>
                <div className={styles.item} name="JSON Editor">
                    <SplitView sizes={[75, 25]} minSize={[600, 400]}>
                        {editor}
                        <div className={styles.viewer}>
                            {(typeof (parsed) === 'string') ? <Editor language="text" {...editorSetting} value={parsed} /> : <JSONViewer {...jsonViewerOptions} src={parsed} />}
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
                <div className={classNames(styles.item)} name="JSON <-> TOML">
                    <SplitView sizes={[50, 50]} minSize={[500, 500]}>
                        {editor}
                        <div className={styles.viewer}>
                            <Editor language={(typeof (parsed) === 'string') ? 'text' : 'toml'} {...editorSetting} value={(typeof (parsed) === 'string') ? parsed : TOML.stringify(parsed)} onChange={text => {
                                try {
                                    setValue(JSON.stringify(TOML.parse(text), null, indent));
                                } catch (e) {

                                }
                            }} />
                        </div>
                    </SplitView>
                </div>
            </NaviTabs>
            <ToastContainer position="bottom-left" />
        </Fragment>
    ), [value]);
}