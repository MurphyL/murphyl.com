import React from "react";

import MonacoEditor from 'react-monaco-editor';

import Tabs from "plug/extra/dynamic/tabs/dynamic-tabs.module";
import DynamicPage from "plug/extra/dynamic/page/dynamic-page.module";

import styles from './json-kits.module.css';


function JSONEditor() {
    return (
        <MonacoEditor />
    );
}

export default function JSONKits() {
    return (
        <DynamicPage className={styles.root} title="JSON 工具集">
            <Tabs type="navi">
                <div className={styles.item} title="JSON 编辑器">
                    <JSONEditor />
                </div>
                <div className={styles.item} title="JSON 转 CSV">b</div>
            </Tabs>
        </DynamicPage>
    );
}