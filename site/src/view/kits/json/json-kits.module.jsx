import React from "react";

import classNames from "classnames";

import MonacoEditor from 'react-monaco-editor';

import Tabs from "plug/extra/dynamic/tabs/dynamic-tabs.module";
import DynamicPage from "plug/extra/dynamic/page/dynamic-page.module";

import styles from './json-kits.module.css';

export default function JSONKits() {
    return (
        <DynamicPage className={styles.root} title="JSON 工具集">
            <Tabs type="navi" logo={'Hello'}>
                <div className={styles.json_editor} title="JSON 编辑器">
                    <MonacoEditor language="json"/>
                </div>
                <div className={classNames(styles.json_editor)} title="JSON 转 CSV">
                    <MonacoEditor language="json"/>
                </div>
            </Tabs>
        </DynamicPage>
    );
}