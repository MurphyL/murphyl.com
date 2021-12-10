import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import kindOf from 'kind-of';
import classNames from "classnames";

import * as monaco from 'monaco-editor';

import JSONView from 'react-json-view';

import styles from './code.module.css';

const PLAINTEXT = 'plaintext';

const editorOptions = {
    fontSize: 18,
    width: '100%',
    height: '100%',
    automaticLayout: true,
};

/**
 * 代码块
 * 
 * @param {*} param0 
 * @returns 
 */
export const CodeBlock = memo(({ language = PLAINTEXT, value }) => {
    const instance = useRef(null);
    useEffect(() => {
        if (null === instance || null === instance.current) {
            return;
        }
        monaco.editor.colorizeElement(instance.current, {
            tabSize: 4
        });
    }, []);
    return (
        <pre className={styles.block}>
            <code data-lang={language} ref={instance}>
                {value}
            </code>
        </pre>
    );
});

CodeBlock.displayName = 'CodeBlock';

/**
 * 代码编辑器
 * 
 * @param {*} param0 
 * @returns 
 */
export const CodeEditor = memo(({ className, language = PLAINTEXT, defaultValue, value, minimap, onChange, ...extra }) => {
    const instance = useRef();
    const [editor, setEditor] = useState();
    const [prevent, setPrevent] = useState(false);
    useEffect(() => {
        if (null === instance || null === instance.current) {
            return;
        }
        const editorInstance = monaco.editor.create(instance.current, Object.assign(editorOptions, extra, {
            id: `editor-${Date.now()}`,
            language,
            value: defaultValue || value || '',
            minimap: {
                enabled: minimap
            }
        }));
        if (onChange && kindOf(onChange) === 'function') {
            editorInstance.onDidChangeModelContent(() => {
                setPrevent(true);
                onChange(editorInstance.getValue());
                setPrevent(false);
            });
        }
        setEditor(editorInstance);
        return () => editorInstance && editorInstance.dispose();
    }, [language]);
    useEffect(() => {
        editor && !prevent && editor.setValue(value);
    }, [value]);
    return useMemo(() => (
        <div className={classNames(styles.editor, className)} ref={instance} />
    ), []);
});

CodeEditor.displayName = 'CodeEditor';


export const DiffEditor = memo(({ className, language = PLAINTEXT, defaultValue, value, minimap, onChange, ...extra }) => {
    const instance = useRef();
    useEffect(() => {
        if (null === instance || null === instance.current) {
            return;
        }
        const editorInstance = monaco.editor.createDiffEditor(instance.current, Object.assign(editorOptions, extra, {
            id: `editor-${Date.now()}`,
            originalEditable: true
        }));
        const [ original, modified ] = (kindOf(value) === 'array') ? value : [ value, value ];
        var originalModel = monaco.editor.createModel(original, language);
        var modifiedModel = monaco.editor.createModel(modified, language);
        editorInstance.setModel({
            original: originalModel,
            modified: modifiedModel
        });
        return () => editorInstance && editorInstance.dispose();
    }, [language]);
    return useMemo(() => (
        <div className={classNames(styles.editor, className)} ref={instance} />
    ));
});

DiffEditor.displayName = 'DiffEditor';

/**
 * JSON 查看器
 * 
 * @param {*} param0 
 * @returns 
 */
export const JSONViewer = memo(({ className, data = {}, onChange = false }) => {
    if (onChange && kindOf(onChange) !== 'function') {
        throw new Error('onChange must a function');
    }
    const options = {
        style: {
            fontSize: '16px',
            fontFamily: '"SF Mono", Monaco, Menlo, Consolas, "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace'
        },
        name: null,
        onAdd: onChange ? ({ updated_src, existing_src }) => { onChange(updated_src, existing_src) } : false,
        onEdit: onChange ? ({ updated_src, existing_src }) => { onChange(updated_src, existing_src) } : false,
        onDelete: onChange ? ({ updated_src, existing_src }) => { onChange(updated_src, existing_src) } : false,
        collapsed: false,
        iconStyle: 'circle',
        quotesOnKeys: false,
        shouldCollapse: false,
        enableClipboard: false,
        displayDataTypes: true,
        displayObjectSize: false
    };
    return (
        <div className={className}>
            <JSONView src={data} {...options} />
        </div>
    );
});

JSONViewer.displayName = 'JSONViewer';