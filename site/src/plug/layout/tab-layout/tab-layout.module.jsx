import React from 'react';

import styles from './tab-layout.module.css';

export default function TabLayout({ children, id }) {
    return (
        <div className={styles.root} data-issue-id={id}>
            
        </div>
    );
}