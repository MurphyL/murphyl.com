import { createContext, useContext, useMemo, useRef, useState } from "react";

import JSONView from 'react-json-view';
import { Outlet } from "react-router-dom";

import doCopy from 'copy-to-clipboard';

import { toast, ToastContainer } from 'react-toast';

import TOML from '@iarna/toml';
import unsafeParseJSON from 'parse-json';
import safeStringifyJSON from 'json-stringify-safe';

import NaviLayout from "plug/layout/navi-layout/navi-layout.module";

import FormItem from 'plug/extra/form-item/form-input.module';

import { CodeEditor } from 'plug/extra/code/code.module';
import SplitView from 'plug/extra/split-view/split-view.module';
import DriftToolbar from 'plug/extra/drift-toolbar/drift-toolbar.module';

import styles from './json-kits-v1.module.css';

const SourceContext = createContext();

const stringifyJSON = (source, indent) => {
    if (!source) {
        return null;
    }
    try {
        return safeStringifyJSON(source, null, indent);
    } catch (e) {
        return `Stringify JSON error: ${e.message}`;
    }
}

const parseJSON = (source) => {
    if (!source) {
        return null;
    }
    try {
        return unsafeParseJSON(source);
    } catch (e) {
        return {
            [`Parse JSON error`]: e.message
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

const KIT_OPTIONS = {
    editor: {
        indent: 4
    },
    viewer: {
        style: {
            fontSize: '16px'
        },
        name: null,
        onAdd: false,
        onEdit: false,
        onDelete: false,
        collapsed: false,
        iconStyle: 'circle',
        quotesOnKeys: false,
        shouldCollapse: false,
        enableClipboard: false,
        displayDataTypes: false,
        displayObjectSize: false
    }
};

function JSONViewer() {
    const { source, options } = useContext(SourceContext);
    return (
        <div>
            <JSONView src={parseJSON(source)} {...options.viewer} />
        </div>
    );
};

export function Layout() {
    const readerInstance = useRef();
    const [source, setSource] = useState('{}');
    const [options, setOptions] = useState(KIT_OPTIONS);
    const editor = useMemo(() => (
        <div className={styles.source}>
            <CodeEditor className={styles.editor} language="json" value={source} onChange={value => setSource(value)} />
        </div>
    ), [source])
    const updateOption = (userOptions) => {
        setOptions(options, userOptions);
    };
    return (
        <NaviLayout items={JSON_KITS_NAVI}>
            <SourceContext.Provider value={{ source, setSource, options, updateOption }}>
                <SplitView className={styles.root} sizes={[55, 45]} minSize={[600, 400]}>
                    {editor}
                    <Outlet />
                </SplitView>
                <DriftToolbar>
                    <button onClick={() => setSource(stringifyJSON(parseJSON(source), (options.editor.indent || 4)))}>Beautify</button>
                    <button onClick={() => setSource(stringifyJSON(parseJSON(source)))}>Minify</button>
                    <button onClick={() => doCopy(source)}>Copy</button>
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
                                    toast.error(`解析 CSV 文件出错：${e.message}`)
                                }
                            } else if (filename.endsWith('.toml')) {
                                try {
                                    setSource(stringifyJSON(TOML.parse(reader.result), 4));
                                } catch (e) {
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
    element: <JSONViewer />
}, {
    path: 'path-query',
    element: <div>query</div>
}, {
    path: 'to-toml',
    element: <div>to toml</div>
}, {
    path: '*',
    element: <div>json 404</div>
}];