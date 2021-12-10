import { createContext, memo, useContext, useMemo, useRef, useState } from "react";

import { Outlet } from "react-router-dom";

import { toast, ToastContainer } from 'react-toast';

import kindOf from 'kind-of';
import classNames from "classnames";

import doCopy from 'copy-to-clipboard';
import TOML from '@iarna/toml';
import { csvParse } from 'd3-dsv';
import unsafeParseJSON from 'parse-json';
import safeStringifyJSON from 'json-stringify-safe';

import { useDocumentTitle, useComponentSize, useJSONPath } from 'plug/hooks';

import { Button, TextArea, FileInput } from 'plug/extra/form-item/form-item.module';

import SplitView from 'plug/extra/split-view/split-view.module';
import NaviLayout from "plug/layout/navi-layout/navi-layout.module";
import DriftToolbar from 'plug/extra/drift-toolbar/drift-toolbar.module';
import { CodeBlock, CodeEditor, JSONViewer } from 'plug/extra/code/code.module';

import styles from './json-kits-v1.module.css';


const SourceContext = createContext();

const stringifyJSON = (data, indent) => {
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
        return {
            ok: false,
            action: 'Parse TOML error',
            message: e.message
        };
    }
};

const JSON_KITS_NAVI = [{
    path: './',
    name: 'JSON Editor',
}, {
    path: './path-query',
    name: 'Path Query',
}, {
    path: './to-toml',
    name: 'JSON -> TOML',
}];

function JSONEditor() {
    useDocumentTitle('JSON 编辑器');
    const { source, setSource } = useContext(SourceContext);
    const data = useMemo(() => parseJSON(source), [source]);
    return (
        <div className={classNames(styles.right, styles.viewer)}>
            {(kindOf(data) === 'string') ? (
                <CodeBlock className={styles.error} language="text" value={data} />
            ) : (
                <JSONViewer data={data} onChange={(value) => {
                    setSource(stringifyJSON(value, 4));
                }} />
            )}
        </div>
    );
};

const PathQuery = () => {
    const textarea = useRef(null);
    const [path, setPath] = useState('$');
    const { height: textareaHeight } = useComponentSize(textarea);
    const { source } = useContext(SourceContext);
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

function TOMLConvertrer() {
    useDocumentTitle('TOML 编辑器');
    const { source } = useContext(SourceContext);
    return (
        <div className={classNames(styles.right, styles.toml)}>
            <CodeEditor language="toml" value={stringifyTOML(parseJSON(source))} minimap={false} readOnly={true} />
        </div>
    );
};

export function Layout() {
    useDocumentTitle('JSON 工具集');
    const readerInstance = useRef();
    const [source, setSource] = useState('{}');
    const editor = useMemo(() => (
        <CodeEditor className={styles.editor} language="json" value={source} onChange={value => {
            setSource(value);
        }} />
    ), [source])
    return (
        <NaviLayout items={JSON_KITS_NAVI}>
            <SourceContext.Provider value={{ source, setSource }}>
                <SplitView className={styles.root} sizes={[55, 45]} minSize={[600, 400]}>
                    <div className={styles.left}>
                        {editor}
                    </div>
                    <Outlet />
                </SplitView>
                <DriftToolbar>
                    <Button onClick={() => setSource(stringifyJSON(parseJSON(source), 4))}>Beautify</Button>
                    <Button onClick={() => setSource(stringifyJSON(parseJSON(source)))}>Minify</Button>
                    <Button onClick={() => doCopy(source, { debug: true })}>Copy</Button>
                    <FileInput placeholder="Load file as JSON..." ref={readerInstance} accept=".json,.toml,.csv" onChange={(loaded) => {
                        if (!loaded) {
                            return;
                        }
                        // TODO 解析 CSV/TOML/YAML
                        const { filename, content } = loaded;
                        if (filename.endsWith('.json')) {
                            setSource(content);
                        } else if (filename.endsWith('.csv')) {
                            try {
                                setSource(stringifyJSON(csvParse(content), 4));
                            } catch (e) {
                                console.log('解析 CSV 文件出错：', filename, e);
                                toast.error(`解析 CSV 文件出错：${e.message}`)
                            }
                        } else if (filename.endsWith('.toml')) {
                            try {
                                setSource(stringifyJSON(parseTOML(content), 4));
                            } catch (e) {
                                console.log('解析 TOML 文件出错：', filename, e);
                                toast.error(`解析 TOML 文件出错：${e.message}`);
                            }
                        }
                    }} />
                </DriftToolbar>
            </SourceContext.Provider>
            <ToastContainer position="bottom-right" />
        </NaviLayout>
    );
};

export const Routes = [{
    index: true,
    element: <JSONEditor />
}, {
    path: 'path-query',
    element: <PathQuery />
}, {
    path: 'to-toml',
    element: <TOMLConvertrer />
}, {
    path: '*',
    element: <div>json 404</div>
}];