import { useState } from 'react';

import CryptoJS from 'crypto-js';

import styles from './crypto.module.css';

const encrypt = (algo, value) => {
    console.log(algo, value);
    console.log(CryptoJS[algo](value).toString(CryptoJS.enc.Base64));
};

export default function Crypto() {
    const [ algo, setAlgo ] = useState('MD5');
    const [ source, setSource ] = useState('');
    const [ target, setTarget ] = useState('');
    const encrypt = (algo, value) => {
        setTarget(CryptoJS[algo](value).toString(CryptoJS.enc.Base64));
    };
    return (
        <div className={styles.root}>
            <div className={styles.textarea}>
                <textarea name="source" placeholder="请输入要转换的内容" onChange={({ target }) => {
                    setSource(target.value);
                    encrypt(algo, source);
                }} />
            </div>
            <div>
                <select name="algo" defaultValue={algo} onChange={({target}) => {
                    setAlgo(target.value);
                    encrypt(algo, source);
                }}>
                    <option value="AES">AES</option>
                    <option value="DES">DES</option>
                    <option value="MD5">MD5</option>
                </select>
            </div>
            <div className={styles.textarea}>
                <textarea name="target" value={target} placeholder="转换后的内容" readOnly/>
            </div>
            <div>数据加密 - https://github.com/brix/crypto-js</div>
        </div>
    );
}