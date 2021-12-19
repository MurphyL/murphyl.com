import { memo, useEffect, useMemo, useRef, useState } from 'react';

import kindOf from 'kind-of';
import { nanoid } from 'nanoid';
import classNames from "classnames";
import doCopy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import * as monaco from 'monaco-editor';

import JSONView from 'react-json-view';

import styles from './source-code.module.css';

const PLAINTEXT = 'plaintext';

const editorOptions = {
    fontSize: '18px',
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
export const CodeBlock = memo(({ language = PLAINTEXT, copyable = true, value }) => {
    const instance = useRef(null);
    useEffect(() => {
        if (null === instance || null === instance.current) {
            return;
        }
        monaco.editor.colorizeElement(instance.current, {
            tabSize: 4
        });
    }, [value]);
    return (
        <pre className={styles.block}>
            {copyable && <i className={styles.copyable} onClick={() => doCopy(value, {
                debug: true,
                format: 'text/plain',
                onCopy: () => {
                    toast('Copyed!');
                }
            })} />}
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
        const editorInstance = monaco.editor.create(instance.current, {
            id: `editor-${nanoid()}`,
            ...editorOptions,
            ...extra,
            language,
            value: defaultValue || value || '',
            minimap: {
                enabled: minimap
            }
        });
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
    const [originalModel, setOriginalModel] = useState();
    const [modifiedModel, setModifiedModel] = useState();
    useEffect(() => {
        if (null === instance || null === instance.current) {
            return;
        }
        const editorInstance = monaco.editor.createDiffEditor(instance.current, {
            ...editorOptions,
            ...extra,
            id: `diff-editor-${nanoid()}`,
            originalEditable: true
        });
        const [original, modified] = (kindOf(value) === 'array') ? value : [value, value];
        var originalModel = monaco.editor.createModel(original, language);
        var modifiedModel = monaco.editor.createModel(modified, language);
        editorInstance.setModel({
            original: originalModel,
            modified: modifiedModel
        });
        setOriginalModel(originalModel);
        setModifiedModel(modifiedModel);
        return () => editorInstance && editorInstance.dispose();
    }, [language]);
    useEffect(() => {
        const [original, modified] = value;
        originalModel && original && originalModel.setValue(original);
        modifiedModel && modified && modifiedModel.setValue(modified);
    }, [value]);
    return useMemo(() => (
        <div className={classNames(styles.editor, styles.diff, className)} ref={instance} />
    ));
});

DiffEditor.displayName = 'DiffEditor';

/**
 * JSON 查看器
 * 
 * @param {*} param0 
 * @returns 
 */
export const JSONViewer = memo(({ className, name, value = {}, onChange = false }) => {
    if (onChange && kindOf(onChange) !== 'function') {
        throw new Error('onChange must a function');
    }
    const options = {
        style: {
            fontSize: '18px',
            fontFamily: 'Consolas, "Courier New", monospace'
        },
        name: (kindOf(name) === 'string') ? name : false,
        onAdd: onChange ? ({ updated_src, existing_src }) => { onChange(updated_src, existing_src) } : false,
        onEdit: onChange ? ({ updated_src, existing_src }) => { onChange(updated_src, existing_src) } : false,
        onDelete: onChange ? ({ updated_src, existing_src }) => { onChange(updated_src, existing_src) } : false,
        collapsed: false,
        iconStyle: 'circle',
        quotesOnKeys: false,
        shouldCollapse: false,
        enableClipboard: false,
        displayDataTypes: false,
        displayObjectSize: false
    };
    return (
        <div className={classNames(styles.json_view, className)}>
            <JSONView src={value} {...options} />
        </div>
    );
});

JSONViewer.displayName = 'JSONViewer';