import { useEffect, useRef } from 'react';

import useComponentSize from '@rehooks/component-size';

import MonacoEditor, { MonacoDiffEditor, monaco } from 'react-monaco-editor';

import styles from './code.module.css';

const editorOptions = {
    fontSize: 18,
    scrollBeyondLastLine: false,
};

export function CodeBlock(params) {
    const payload = useRef(null);
    useEffect(() => {
        if (null === payload || null === payload.current) {
            return;
        }
        monaco.editor.colorizeElement(payload.current, {
            tabSize: 4
        });
    }, []);
    return (
        <pre className={styles.block}>
            <code data-lang={language} ref={payload}>
                {code}
            </code>
        </pre>
    );
}


export function CodeEditor({ options = {}, ...extra }) {
    const wrapper = useRef();
    const { width, height } = useComponentSize(wrapper);
    return (
        <div className={styles.editor} ref={wrapper}>
            <MonacoEditor {...extra} options={Object.assign(editorOptions, options)} width={width} height={height} />
        </div>
    );
}


export function DiffEditor({ options = {}, ...extra }) {
    const wrapper = useRef();
    const { width, height } = useComponentSize(wrapper);
    return (
        <div className={styles.editor} ref={wrapper}>
            <MonacoDiffEditor  {...extra} options={Object.assign(editorOptions, options)} width={width} height={height} />
        </div>
    );
}