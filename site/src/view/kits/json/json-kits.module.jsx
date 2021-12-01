import React, { Fragment, useState } from "react";

import { ToastContainer, toast } from 'react-toast'
import classNames from "classnames";


import CodeEditor from "plug/extra/code-editor";

import { NaviTabs } from "plug/dynamic/tabs/dynamic-tabs.module";

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

const validate = (rows) => {
    toast.hideAll();
    rows.forEach(({ message, startLineNumber, endLineNumber }) => {
        toast.error(`Line ${Array.from(new Set([startLineNumber, endLineNumber])).join('-')}: ${message}`)
    });
};

export default function JSONKits() {
    const [value, setValue] = useState('{}');
    const editor = <CodeEditor language="json" onValidate={validate} value={value} onChange={setValue} />;
    return (
        <Fragment>
            <NaviTabs className={styles.root} logo={<b>JSON 工具集</b>}>
                <div className={styles.item} name="JSON 编辑器">
                    <div className={styles.editor}>
                        {editor}
                    </div>
                    <DriftToolbar className={styles.toolbar}>
                        <button onClick={() => { setValue(JSON.stringify(JSON.parse(value), null, 4)) }}>Beautify</button>
                        <button onClick={() => { setValue(JSON.stringify(JSON.parse(value))) }}>Minify</button>
                    </DriftToolbar>
                </div>
                <div className={classNames(styles.item)} name="JSON 转 CSV">
                    {editor}
                </div>
            </NaviTabs>
            <ToastContainer position="bottom-left" />

        </Fragment>
    );
}