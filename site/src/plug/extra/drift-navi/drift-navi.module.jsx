import React from 'react';

import styles from './drift-navi.module.css';

export default function DriftNav({ postion = 'rb' }) {
    return (
        <div className={styles.root} data-postion={postion}>
        </div>
    );
}