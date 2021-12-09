import { useMemo } from 'react';

import doCopy from 'copy-to-clipboard';

import unsafeParseJSON from 'parse-json';
import safeStringifyJSON from 'json-stringify-safe';

import NaviLayout from "plug/layout/navi-layout/navi-layout.module";

import { CodeEditor } from 'plug/extra/code/code.module';
import DriftToolbar from 'plug/extra/drift-toolbar/drift-toolbar.module';
import SplitView from 'plug/extra/split-view/split-view.module';
import { createContext, useContext, useState } from "react";
import JSONView from 'react-json-view';
import { Outlet, useNavigate } from "react-router-dom";
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

function OptionsBoard() {
    const { options, updateOption } = useContext(SourceContext);
    return (
        <div className={styles.options}>
            <dl>
                <dt><b>Editor</b> Options:</dt>
                <dd>
                    <div>
                        <label>
                            <span>格式化缩进</span>
                            <input type="number" defaultValue={options.editor.indent} onChange={(e) => { updateOption({ indent: parseInt(e.target.value) }) }} />
                        </label>
                    </div>
                </dd>
                <dt><b>Viewer</b> Options:</dt>
                <dd>
                    <div>
                        <label>
                            <span>格式化缩进</span>
                            <input type="number" defaultValue={options.editor.indent} onChange={(e) => { updateOption({ indent: parseInt(e.target.value) }) }} />
                        </label>
                    </div>
                </dd>
            </dl>
        </div>
    );
};

export function JSONKits() {
    const navigate = useNavigate();
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
                    <button onClick={() => navigate('./settings')}>Setting</button>
                </DriftToolbar>
            </SourceContext.Provider>
        </NaviLayout>
    );
};

export default [{
    index: true,
    element: <JSONViewer />
}, {
    path: 'path-query',
    element: <div>query</div>
}, {
    path: 'to-toml',
    element: <div>to toml</div>
}, {
    path: 'settings',
    element: <OptionsBoard />
}, {
    path: '*',
    element: <div>json 404</div>
}];