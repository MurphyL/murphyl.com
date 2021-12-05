import React, { useEffect, useRef } from 'react';

import { loader } from "@monaco-editor/react";

import styles from './code-block.module.css';

export default function CodeBlock({ language, code = '' }) {
    const payload = useRef(null);
    useEffect(() => {
        if (null === payload || null === payload.current) {
            return;
        }
        loader.init().then(monaco => {
            monaco.editor.colorizeElement(payload.current, {
                tabSize: 4
            });
        });
    }, []);
    return (
        <pre className={styles.root}>
            <code data-lang={language} ref={payload}>
                {code}
            </code>
        </pre>
    );
}