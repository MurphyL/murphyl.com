import React, { useState } from "react";

import classNames from 'classnames';

import MonacoEditor from 'react-monaco-editor';

import { MultiSelect } from "react-multi-select-component";

import { toBase64, fromBase64 } from 'js-base64';

import styles from './crypto.module.css';

const editorOptions = {
    loading: '编辑器正在初始化……',
    options: {
        fontSize: 14,
        codeLens: false,
        contextmenu: false,
        formatOnPaste: true,
        renderFinalNewline: true,
        snippetSuggestions: false,
        renderWhitespace: 'selection',
        fontFamily: 'Menlo,Monaco,Consolas,Andale Mono,lucida console,Courier New,monospace'
    },
};

const options = [
    { label: 'Base64', value: 'Base64' },
    { label: 'AES', value: 'AES' },
    { label: 'DES', value: 'DES' },
    { label: 'MD5', value: 'MD5' },
    { label: 'SHA', value: ['SHA1', 'SHA224'] },
];

const overrides = {
    "search": "搜索",
    "selectAll": "全选",
    "noOptions": "没有可选项",
    "clearSearch": "清空搜索内容",
    "selectSomeItems": "请选择...",
    "selectAllFiltered": "全选过滤内容",
    "allItemsAreSelected": options.map(({ label }) => label).join(', '),
};

const convert = (methods, source, encoding) => {
    if (typeof (methods) === 'string') {
        if (methods === 'Base64') {
            return encoding ? fromBase64(source) : toBase64(source);
        }
        return `${methods} - ${source}`;
    }
    if (Array.isArray(methods)) {
        return `${JSON.stringify(methods)} - ${source}`;
    }
    return `${methods} - ${source}`;
};

export default function CryptoText() {
    const [source, setSource] = useState('请输入要转换的文本……');
    const [encoding, setEncoding] = useState(false);
    const [selected, setSelected] = useState([options[0]]);
    return (
        <div className={styles.root}>
            <div className={styles.editor}>
                <MonacoEditor {...editorOptions} value={source} onChange={(value) => setSource(value)} />
            </div>
            <div className={styles.toolbar}>
                <div className={classNames(styles.part, styles.selector)}>
                    <MultiSelect options={options} hasSelectAll={false} value={selected} onChange={setSelected} overrideStrings={overrides} />
                </div>
                <label className={styles.part}>
                    <span>解密：</span>
                    <input type="checkbox" defaultChecked={encoding} onChange={e => setEncoding(e.target.checked)} />
                </label>
            </div>
            <div className={styles.board}>
                {selected.map((item, index) => (
                    <div key={index}>
                        <span>{item.label}：</span>
                        <code>{convert(item.value, source, encoding)}</code>
                    </div>
                ))}
            </div>
        </div>
    );
};