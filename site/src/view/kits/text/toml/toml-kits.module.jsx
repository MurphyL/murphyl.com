import { useDocumentTitle } from 'plug/hooks';

import SplitView from 'plug/extra/split-view/split-view.module';
import { CodeBlock, CodeEditor, JSONViewer } from 'plug/extra/source-code/source-code.module';

import styles from './toml-kits.module.css';

export default function TOMLKits() {
    useDocumentTitle('TOML 编辑器');
    return (
        <SplitView className={styles.root}>
            <CodeEditor className={styles.item} />
            <JSONViewer className={styles.item} />
        </SplitView>
    );
}