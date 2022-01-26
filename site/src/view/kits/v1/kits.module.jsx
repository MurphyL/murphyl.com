import { useDocumentTitle } from 'plug/hooks';

import { Splitter } from "plug/components";

import styles from './kits.module.css';

export default function Kits() {
    useDocumentTitle('工具');
    return (
        <div className={styles.root}>
            <Splitter sizes={[15, 85]} gutterSize={2} minSize={230}>
                <div>1</div>
                <div>2</div>
            </Splitter>
        </div>
    );
};