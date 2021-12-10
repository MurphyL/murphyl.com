import { useState } from "react";

import { DiffEditor } from 'plug/extra/code/code.module';

import { useDocumentTitle } from 'plug/hooks';


import { FileInput, Label } from 'plug/extra/form-item/form-item.module';
import DriftToolbar from 'plug/extra/drift-toolbar/drift-toolbar.module';

import styles from './text-differ.module.css';

const DEFAULT_VALUE = 'Paste text here…';

export default function DifferenceEditor() {
    useDocumentTitle('文本比较');
    const [values, setValues] = useState([DEFAULT_VALUE, DEFAULT_VALUE]);
    return (
        <div className={styles.root}>
            <DiffEditor value={values} />
            <DriftToolbar>
                <Label>Load files:</Label>
                <FileInput placeholder="nothing…" multiple={true} onChange={(files) => {
                    // `/** Right - load [${left.fileType}] file from ${right.filename} **/\n\n${right.content}`
                    if (!files || !Array.isArray(files) || files.length === 0) {
                        return;
                    }
                    setValues(files.map(item => `/** Load [${item.fileType}] file from ${item.filename} **/\n\n${item.content}`));
                }} />
            </DriftToolbar>
        </div>
    );
}