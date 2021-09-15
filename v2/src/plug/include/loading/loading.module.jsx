import React from 'react';

import styles from './loading.module.css';

export function Loading({ message }) {
    return (
        <div className={styles.root}>
            <div className="spin">
                <img src="/image/squares.svg" alt="loading spin" />
            </div>
            <div>{ message || '加载中……' }</div>
        </div>
    );
};
