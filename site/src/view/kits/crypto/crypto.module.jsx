import React, { useState } from "react";

import classNames from 'classnames';
import { toBase64, fromBase64 } from 'js-base64';

import Select from 'react-select';

import styles from './crypto.module.css';

const options = [
    { label: 'Base64', value: 'Base64' },
    { label: 'AES', value: 'AES' },
    { label: 'DES', value: 'DES' },
    { label: 'MD5', value: 'MD5' },
    { label: 'SHA', value: ['SHA1', 'SHA224'] },
];

const convert = ({ value: method }, source, encoding) => {
    if (typeof (method) === 'string') {
        if (method === 'Base64') {
            return encoding ? fromBase64(source) : toBase64(source);
        }
        return `${method} - ${source}`;
    }
    if (Array.isArray(method)) {
        return `${JSON.stringify(method)} - ${source}`;
    }
    return `${method} - ${source}`;
};

export default function CryptoText() {
    const [source, setSource] = useState('请输入要转换的文本……');
    const [encoding, setEncoding] = useState(false);
    const [selected, setSelected] = useState(options[0]);
    return (
        <div className={styles.root}>
            <div className={styles.editor}>
                <textarea placeholder={source} defaultValue={source} onChange={e => { setSource(e.target.value) }} />
            </div>
            <div className={styles.toolbar}>
                <div className={classNames(styles.part, styles.selector)}>
                    <Select options={options} value={selected} onChange={setSelected} />
                </div>
                <label className={styles.part}>
                    <span>解密：</span>
                    <input type="checkbox" defaultChecked={encoding} onChange={e => setEncoding(e.target.checked)} />
                </label>
            </div>
            <div className={styles.board}>
                <div>{convert(selected, source, encoding)}</div>
            </div>
        </div>
    );
};