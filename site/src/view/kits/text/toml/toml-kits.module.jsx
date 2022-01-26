import { useMemo, useState } from 'react';

import kindOf from 'kind-of';
import TOML from '@iarna/toml';

import { useDocumentTitle } from 'plug/hooks';

import { Splitter, CodeBlock, CodeEditor, JSONViewer } from "plug/components";

import styles from './toml-kits.module.css';

export default function TOMLKits() {
    useDocumentTitle('TOML 编辑器');
    const [content, setContent] = useState('[data]');
    const data = useMemo(() => {
        try {
            return TOML.parse(content);
        } catch (e) {
            return e.message;
        }

    }, [content]);
    return (
        <Splitter className={styles.root}>
            <CodeEditor className={styles.item} value={content} onChange={setContent} />
            <div className={styles.item}>
                {(kindOf(data) === 'string') ? (
                    <CodeBlock value={data} />
                ) : (
                    <JSONViewer value={data} name="TOML" />
                )}
            </div>
        </Splitter>
    );
}