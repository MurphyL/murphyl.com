import React from 'react';

import styles from './tab-layout.module.css';

export default function TabLayout({ id, title, children }) {
    return (
        <div className={styles.root} data-issue-id={id}>
            <header>
                <b>{title || '未命名'}</b>
            </header>
            <div className={styles.body}>
                {children}
            </div>
        </div>
    );
};
