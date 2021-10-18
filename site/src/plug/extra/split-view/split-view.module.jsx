import React from "react";

import ReactSplitView from 'react-split-views';

import styles from './split-view.module.css';

export default function SplitView({ children }) {
    return (
        <ReactSplitView className={styles.root}>{children}</ReactSplitView>
    )
}