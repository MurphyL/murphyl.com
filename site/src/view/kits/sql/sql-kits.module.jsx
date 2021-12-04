import React, { useState } from 'react';

import { format } from 'sql-formatter';

import Editor from "@monaco-editor/react";

import { NaviTabs } from "plug/dynamic/dynamic.module";
import DriftToolbar from 'plug/extra/drift-toolbar/drift-toolbar.module';

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
    return (
        <div style={{ padding: '3px', height: 'calc(100% - 3px * 2)' }}>
            <Editor {...editorSetting} value={value} onChange={setValue} />
            <DriftToolbar>
                <select>
                    <option>mysql</option>
                </select>
                <button onClick={() => {
                    setValue(format(value, {
                        language: 'mysql',
                        indent: '  ',
                        uppercase: true, // Defaults to false
                        linesBetweenQueries: 2, // Defaults to 1
                    }));
                }}>格式化</button>
            </DriftToolbar>
        </div>
    );
}


export default function SQLKits(params) {
    return (
        <NaviTabs>
            <SQLFormatter name="SQL 格式化" />
            <div name="SQL 代码片段"></div>
            <div name="SQL 帮助文档"></div>
            <div name="SQL 窗口函数"></div>
        </NaviTabs>
    );
}