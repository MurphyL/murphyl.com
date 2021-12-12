import { useState } from "react";

import { DiffEditor } from 'plug/extra/source-code/source-code.module';

import { useDocumentTitle } from 'plug/hooks';

import { FileInput, Label } from 'plug/extra/form-item/form-item.module';
import DriftToolbar from 'plug/extra/drift-toolbar/drift-toolbar.module';

import styles from './text-difference.module.css';

const DEFAULT_VALUE = 'Paste text here…';

export default function TextDifference() {
    useDocumentTitle('文本比较');
    const [values, setValues] = useState([DEFAULT_VALUE, DEFAULT_VALUE]);
    return (
        <div className={styles.root}>
            <DiffEditor value={values} />
            <DriftToolbar>
                <Label>Load files:</Label>
                <FileInput placeholder="nothing…" multiple={true} size={2} onChange={(files) => {
                    if (!files || !Array.isArray(files) || files.length === 0) {
                        return;
                    }
                    setValues(files.map(file => `/** Load from [${file.name}] **/\n\n${file.content}`));
                }} />
            </DriftToolbar>
        </div>
    );
}