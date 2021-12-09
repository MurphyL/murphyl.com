import React from "react";

import classNames from 'classnames';

import Split from 'react-split';

import styles from './split-view.module.css';

export default function SplitView({ className, children, type = 'horizontal', ...extra }) {
    return (
        <Split className={classNames(styles.root, styles[type], className)} gutterSize={5} direction={type} {...extra}>
            {children}
        </Split>
    )
}