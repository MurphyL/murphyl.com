import { createContext, Fragment, useContext, useEffect, useMemo, useRef, useState } from "react";

import { Outlet, useResolvedPath, useOutletContext } from "react-router-dom";

import { toast, ToastContainer } from 'react-toast';

import kindOf from 'kind-of';
import classNames from "classnames";

import doCopy from 'copy-to-clipboard';
import TOML from '@iarna/toml';
import { csvParse } from 'd3-dsv';
import unsafeParseJSON from 'parse-json';
import safeStringifyJSON from 'json-stringify-safe';
import stripJSONComments from 'strip-json-comments';

import { useDocumentTitle, useComponentSize, useJSONPath } from 'plug/hooks';

import { Button, TextArea, FileInput } from 'plug/extra/form-item/form-item.module';

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
        return safeStringifyJSON(data, null, indent);
    } catch (e) {
        return `Stringify JSON error: \n${e.message}`;
    }
}

const parseJSON = (source) => {
    if (!source) {
        return null;
    }
    try {
        return unsafeParseJSON(source);
    } catch (e) {
        return `Parse JSON error:\n${e.message}`;
    }
};

const stringifyTOML = (data) => {
    try {
        return (kindOf(data) === 'array') ? TOML.stringify({ data }) : TOML.stringify(data);
    } catch (e) {
        return e.message;
    }
};

const parseTOML = (source) => {
    if (!source) {
        return null;
    }
    try {
        return TOML.parse(source);
    } catch (e) {
        return e.message;
    }
};

const JSONEditor = () => {
    useDocumentTitle('JSON 编辑器');
    const { source, setSource } = useContext(JSONKitsContext);
    const data = useMemo(() => parseJSON(source), [source]);
    return (
        <div className={classNames(styles.right, styles.viewer)}>
            {(kindOf(data) === 'string') ? (
                <CodeBlock className={styles.error} language="text" value={data} />
            ) : (
                <JSONViewer data={data} onChange={(value) => {
                    setSource(stringifyJSON(value));
                }} />
            )}
        </div>
    );
};

const PathQuery = () => {
    useDocumentTitle('JSONPath Query');
    const textarea = useRef(null);
    const [path, setPath] = useState('$');
    const { height: textareaHeight } = useComponentSize(textarea);
    const { source } = useContext(JSONKitsContext);
    const data = useMemo(() => parseJSON(source), [source]);
    const result = useJSONPath(data, path);
    return (
        <div className={classNames(styles.right, styles.jsonpath)}>
            <div ref={textarea}>
                <TextArea value={path} data-after="JSONPath" placeholder="jsonpath..." onChange={setPath} />
            </div>
            <div className={styles.viewer} style={{ height: `calc(100% - ${textareaHeight}px)` }}>
                <JSONViewer className={styles.viewer} name="query result" data={['array', 'object'].includes(kindOf(result)) ? result : [result]} />
            </div>
        </div>
    );
};

const TOMLConvertrer = () => {
    useDocumentTitle('JSON -> TOML');
    const { source } = useContext(JSONKitsContext);
    return (
        <div className={classNames(styles.right, styles.toml)}>
            <CodeEditor language="toml" value={stringifyTOML(parseJSON(source))} minimap={false} readOnly={true} />
        </div>
    );
};

const PATHNAME_PREFIX = 'json/v1';

const JSON_KITS_NAVI = [{
    path: `./${PATHNAME_PREFIX}`,
    name: 'JSON Editor',
}, {
    path:  `./${PATHNAME_PREFIX}/path-query`,
    name: 'Path Query',
}, {
    path:  `./${PATHNAME_PREFIX}/to-toml`,
    name: 'JSON -> TOML',
}];

function JSONKitsLayout() {
    useDocumentTitle('JSON 工具集');
    const readerInstance = useRef();
    const [source, setSource] = useState('{}');
    const { setNaviItems } = useOutletContext();
    useEffect(() => {
        setNaviItems(JSON_KITS_NAVI);
    }, []);
    const editor = useMemo(() => (
        <CodeEditor className={styles.editor} language="json" value={source} onChange={setSource} />
    ), [source])
    return (
        <div className={styles.root}>
            <JSONKitsContext.Provider value={{ source, setSource }}>
                <SplitView sizes={[55, 45]} minSize={[600, 400]}>
                    <div className={styles.left}>
                        {editor}
                    </div>
                    <Outlet />
                </SplitView>
                <DriftToolbar>
                    <Button onClick={() => setSource(stringifyJSON(parseJSON(source)))}>Beautify</Button>
                    <Button onClick={() => setSource(stringifyJSON(parseJSON(source), 0))}>Minify</Button>
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
                                setSource(stringifyJSON(parseTOML(content)));
                            } catch (e) {
                                console.log('解析 TOML 文件出错：', name, e);
                                toast.error(`解析 TOML 文件出错：${e.message}`);
                            }
                        }
                    }} />
                </DriftToolbar>
            </JSONKitsContext.Provider>
            <ToastContainer position="bottom-right" />
        </div>
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