import React, {memo} from "react";

import Editor, { DiffEditor as MonacoDiffEditor } from "@monaco-editor/react";

Editor.displayName = 'MonacoEditor';

// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html#fontSize
const defaultOptions = {
    fontSize: 18,
    scrollBeyondLastLine: false,
};

const defaultSetting = {
    loading: '正在初始化……',
};

export default memo(function CodeEditor({ language, options: userOptions, ...extra }) {
    const settings = Object.assign(defaultSetting, extra);
    const options = Object.assign(defaultOptions, userOptions);
    return (
        <Editor {...settings} options={options} defaultLanguage={language} />
    );
});

export function DiffEditor({ language, options: userOptions, ...extra }) {
    const settings = Object.assign(defaultSetting, extra);
    const options = Object.assign(defaultOptions, userOptions);
    return (
        <MonacoDiffEditor {...settings} options={options} defaultLanguage={language} />
    );
}