import React from "react";

import classNames from 'classnames';

import Split from 'react-split';

import styles from './splitter.module.css';

export default function Splitter({ className, children, type = 'horizontal', ...extra }) {
    return (
        <Split className={classNames(styles.root, styles[type], className)} data-element="split-view" gutterSize={5} direction={type} {...extra}>
            {(React.Children.count(children) > 0) ? children : [<div key="left">No elements here!</div>] }
        </Split>
    )
};