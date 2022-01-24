import { createContext, Fragment, useContext, useEffect, useMemo, useRef, useState } from "react";

import { Outlet, useOutletContext } from "react-router-dom";

import toast from 'react-hot-toast';

import kindOf from 'kind-of';
import classNames from "classnames";
import doCopy from 'copy-to-clipboard';

import TOML from '@iarna/toml';
import { csvParse } from 'd3-dsv';
import unsafeParseJSON from 'parse-json';
import stripJSONComments from 'strip-json-comments';

import { useDocumentTitle, useJSONPath } from 'plug/hooks';

import { Button, TextArea, FileInput } from 'plug/extra/form-item/v1/form-item-v1.module';

import SplitView from 'plug/extra/split-view/split-view.module';
import DriftToolbar from 'plug/extra/drift-toolbar/drift-toolbar.module';
import { CodeBlock, CodeEditor, JSONViewer } from 'plug/extra/source-code/source-code.module';

import styles from './json-kits-v1.module.css';

const JSONKitsContext = createContext();

const stringifyJSON = (data, indent = 4) => {
    if (!data) {
        return null;
    }
    try {
        return JSON.stringify(data, null, indent);
    } catch (e) {
        return `Stringify JSON error: \n${e.message}`;
    }
}

const JSON_ARRAY_VALUE_KEY = '__json_array';
const NOT_JSON_VALUE_KEY = '__not_a_json_value';

const SUPPORTED_VIEWER_TYPES = ['array', 'object'];

const JSONEditor = () => {
    useDocumentTitle('JSON 编辑器');
    const { source, setSource } = useContext(JSONKitsContext);
    const parsed = useMemo(() => {
        try {
            const value = unsafeParseJSON(source);
            if (kindOf(value) === 'object' || kindOf(value) === 'array') {
                return value;
            } else {
                return { [NOT_JSON_VALUE_KEY]: value };
            }
        } catch (e) {
            return e;
        }
    }, [source]);
    return (
        <div className={classNames(styles.right, styles.viewer)}>
            {(kindOf(parsed) === 'error') ? (
                <CodeBlock className={styles.error} language="text" value={parsed.message} />
            ) : (
                <JSONViewer name="JSON" value={parsed} onChange={(value) => {
                    setSource(stringifyJSON(value));
                }} />
            )}
        </div>
    );
};

/**
 * JSONPath 查询 JSON 数据
 * @returns 
 */
const PathQuery = () => {
    useDocumentTitle('JSONPath Query');
    const textarea = useRef();
    const [path, setPath] = useState('$');
    const { source } = useContext(JSONKitsContext);
    const result = useMemo(() => {
        try {
            const parsed = useJSONPath(unsafeParseJSON(source), path);
            return SUPPORTED_VIEWER_TYPES.includes(kindOf(parsed)) ? parsed : [parsed];
        } catch (e) {
            return e;
        }
    }, [source, path]);
    return (
        <div className={classNames(styles.right, styles.jsonpath)}>
            <div className={styles.input} ref={textarea}>
                <TextArea value={path} data-after="JSONPath" placeholder="jsonpath..." onChange={setPath} />
            </div>
            <div className={styles.viewer}>
                {kindOf(result) === 'error' ? (
                    <CodeBlock className={styles.viewer} value={result.message} copyable={false} />
                ) : (
                    <JSONViewer className={styles.viewer} name="JSONPath resolved" value={result} />
                )}
            </div>
        </div>
    );
};

/**
 * TOML 编辑器
 */
const TOMLConvertrer = () => {
    useDocumentTitle('JSON -> TOML');
    const { source } = useContext(JSONKitsContext);
    const [target, setTarget] = useState('');
    useEffect(() => {
        if (source.trim().length === 0) {
            toast.error(`空字符串无法解析`);
            return setTarget(String(source));
        }
        try {
            const json = unsafeParseJSON(source);
            if (kindOf(json) === 'array') {
                toast.error(`无法渲染 JSON 数组，使用[${JSON_ARRAY_VALUE_KEY}]包装数组对象`);
                setTarget(TOML.stringify({ [JSON_ARRAY_VALUE_KEY]: json }));
            } else if (kindOf(json) !== 'object') {
                toast.error(`无法渲染的数据类型，使用[${NOT_JSON_VALUE_KEY}]包装数组对象`);
                setTarget(TOML.stringify({ [NOT_JSON_VALUE_KEY]: json }));
            } else {
                setTarget(TOML.stringify(json));
            }
        } catch (e) {
            toast.error('将 JSON 转换为 TOML 出错');
            console.error('将 JSON 转换为 TOML 出错', e);
            setTarget(e.message);
        }

    }, [source]);
    return (
        <div className={classNames(styles.right, styles.toml)}>
            <CodeEditor language="toml" value={target} minimap={false} readOnly={true} />
        </div>
    );
};

const PATHNAME_PREFIX = 'json/v1';

export const JSON_KITS_NAVI = [{
    path: `./${PATHNAME_PREFIX}/`,
    name: 'JSON Editor',
}, {
    path: `./${PATHNAME_PREFIX}/path-query`,
    name: 'Path Query',
}, {
    path: `./${PATHNAME_PREFIX}/to-toml`,
    name: 'JSON -> TOML',
}];

function JSONKitsLayout() {
    useDocumentTitle('JSON 工具集');
    const readerInstance = useRef();
    const editorInstance = useRef();
    const [source, setSource] = useState('{}');
    const { setNaviItems } = useOutletContext();
    useEffect(() => {
        setNaviItems(JSON_KITS_NAVI);
    }, []);
    return (
        <Fragment>
            <JSONKitsContext.Provider value={{ source, setSource }}>
                <SplitView className={styles.root} sizes={[55, 45]} minSize={[600, 400]}>
                    <div className={styles.left}>
                        <CodeEditor className={styles.editor} language="json" ref={editorInstance} value={source} onChange={setSource} />
                    </div>
                    <Outlet context={source} />
                </SplitView>
            </JSONKitsContext.Provider>
            <DriftToolbar>
                <Button onClick={() => {
                    try {
                        setSource(stringifyJSON(unsafeParseJSON(source)));
                    } catch (e) {
                        toast.error('格式化 JSON 出错');
                    }
                }}>Beautify</Button>
                <Button onClick={() => {
                    try {
                        setSource(stringifyJSON(unsafeParseJSON(source), 0));
                    } catch (e) {
                        toast.error('格式化 JSON 出错');
                    }
                }}>Minify</Button>
                <Button onClick={() => doCopy(source, { debug: true })}>Copy</Button>
                <FileInput placeholder="Load file as JSON..." ref={readerInstance} accept=".json,.toml,.csv" onChange={(loaded) => {
                    if (!loaded) {
                        return;
                    }
                    const { name, content } = loaded;
                    if (name.endsWith('.json')) {
                        setSource(stripJSONComments(content));
                    } else if (name.endsWith('.csv')) {
                        try {
                            setSource(stringifyJSON(csvParse(content)));
                        } catch (e) {
                            console.log('解析 CSV 文件出错：', name, e);
                            toast.error(`解析 CSV 文件出错：${e.message}`)
                        }
                    } else if (name.endsWith('.toml')) {
                        try {
                            setSource(stringifyJSON(TOML.parse(content)));
                        } catch (e) {
                            console.log('解析 TOML 文件出错：', name, e);
                            toast.error(`解析 TOML 文件出错：${e.message}`);
                        }
                    }
                }} />
            </DriftToolbar>
        </Fragment>
    );
};

JSONKitsLayout.displayName = 'JSONKits.Layout@v1';

export default {
    path: PATHNAME_PREFIX,
    element: <JSONKitsLayout />,
    children: [{
        index: true,
        element: <JSONEditor />
    }, {
        path: 'path-query',
        element: <PathQuery />
    }, {
        path: 'to-toml',
        element: <TOMLConvertrer />
    }]
};