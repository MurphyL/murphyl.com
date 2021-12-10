import { createContext, useContext, useMemo, useRef, useState } from "react";

import { Outlet } from "react-router-dom";

import { toast, ToastContainer } from 'react-toast';

import kindOf from 'kind-of';

import doCopy from 'copy-to-clipboard';
import TOML from '@iarna/toml';
import { csvParse } from 'd3-dsv';
import unsafeParseJSON from 'parse-json';
import safeStringifyJSON from 'json-stringify-safe';

import { useDocumentTitle } from 'plug/hooks';

import FormItem from 'plug/extra/form-item/form-input.module';

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
    return (kindOf(data) === 'string') ? (
        <CodeBlock className={styles.error} language="text" value={data} />
    ) : (
        <JSONViewer className={styles.viewer} data={parseJSON(source)} onChange={(value) => {
            setSource(stringifyJSON(value, 4));
        }} />
    );
};

function PathQuery() {
    return (
        <div>

        </div>
    );
};

function TOMLConvertrer() {
    useDocumentTitle('TOML 编辑器');
    const { source } = useContext(SourceContext);
    return (
        <CodeEditor className={styles.editor} language="toml" value={stringifyTOML(parseJSON(source))} minimap={false} readOnly={true} />
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
                    <div className={styles.right}>
                        <Outlet />
                    </div>
                </SplitView>
                <DriftToolbar>
                    <button onClick={() => setSource(stringifyJSON(parseJSON(source), 4))}>Beautify</button>
                    <button onClick={() => setSource(stringifyJSON(parseJSON(source)))}>Minify</button>
                    <button onClick={() => doCopy(source, { debug: true })}>Copy</button>
                    <FormItem type="file" placeholder="Read a file..." ref={readerInstance} accept=".json,.toml,.csv" onChange={(filename) => {
                        if (!filename || !readerInstance || !readerInstance.current || readerInstance.current.length === 0) {
                            return;
                        }
                        const reader = new FileReader();
                        // TODO 解析 CSV/TOML/YAML
                        reader.readAsText(readerInstance.current.files[0]);
                        reader.onload = () => {
                            if (filename.endsWith('.json')) {
                                setSource(reader.result);
                            } else if (filename.endsWith('.csv')) {
                                try {
                                    setSource(stringifyJSON(csvParse(reader.result), 4));
                                } catch (e) {
                                    console.log('解析 CSV 文件出错：', filename, e);
                                    toast.error(`解析 CSV 文件出错：${e.message}`)
                                }
                            } else if (filename.endsWith('.toml')) {
                                try {
                                    setSource(stringifyJSON(parseTOML(reader.result), 4));
                                } catch (e) {
                                    console.log('解析 TOML 文件出错：', filename, e);
                                    toast.error(`解析 TOML 文件出错：${e.message}`);
                                }
                            }
                        };
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