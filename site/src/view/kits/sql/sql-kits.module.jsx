import React, { useState } from 'react';

import { Link } from "react-router-dom";

import { format } from 'sql-formatter';
import { Sqlite } from "@icons-pack/react-simple-icons";

import Editor from "@monaco-editor/react";

import { NaviTabs } from "plug/dynamic/dynamic.module";
import { Dynamic } from 'plug/extra/status/status.module';
import CodeBlock from 'plug/extra/code-block/code-block.module';
import SchemaViewer from 'view/page/schema/schema-page.module';
import DriftToolbar from 'plug/extra/drift-toolbar/drift-toolbar.module';

import styles from './sql-kits.module.css';


const editorSetting = {
    loading: '正在初始化……',
    language: 'sql',
    options: {
        fontSize: 18,
        scrollBeyondLastLine: false,
    }
};

function SQLFormatter() {
    const [value, setValue] = useState('select 1 from dual');
    const [upper, setUpper] = useState(true);
    const [indent, setIndent] = useState(2);
    return (
        <div style={{ padding: '3px', height: 'calc(100% - 3px * 2)' }}>
            <Editor {...editorSetting} value={value} onChange={setValue} />
            <DriftToolbar>
                <label>
                    <span>语法：</span>
                    <select>
                        <option>mysql</option>
                    </select>
                </label>
                <label>
                    <span>关键词大写：</span>
                    <input type="checkbox" checked={upper} onChange={e => setUpper(e.target.checked)} />
                </label>
                <label>
                    <span>缩进：</span>
                    <input type="number" defaultValue={indent} onChange={e => setIndent(e.target.value)} />
                </label>
                <button onClick={() => {
                    setValue(format(value, {
                        language: 'postgresql',
                        indent: Array(parseInt(indent)).fill(' ').join(''),
                        uppercase: upper, // Defaults to false
                        linesBetweenQueries: 2, // Defaults to 1
                    }));
                }}>格式化</button>
            </DriftToolbar>
        </div>
    );
}


export default function SQLKits(params) {
    return (
        <NaviTabs logo={
            <Link to="/" className={styles.logo_link} title="返回首页">
                <Sqlite color="#003B57" />
                <b>JSON 工具集</b>
            </Link>
        }>
            <SQLFormatter name="SQL 格式化" />
            <div name="SQL 代码片段">
                <CodeBlock language="text/css" code={`
                    /* Some example CSS */
                    @import url("something.css");
                `} />
            </div>
            <div name="SQL 帮助文档">
                <Dynamic title="关于" children={<SchemaViewer unique="about-v2" />} />
            </div>
            <div name="SQL 窗口函数"></div>
        </NaviTabs>
    );
}