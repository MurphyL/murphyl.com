import { useDocumentTitle } from 'plug/hooks';

import { Splitter as SplitView } from "plug/components";

import styles from './kits.module.css';

export default function Kits() {
    useDocumentTitle('工具');
    return (
        <div className={styles.root}>
            <SplitView>
                <div>1</div>
                <div>2</div>
            </SplitView>
        </div>
    );
};