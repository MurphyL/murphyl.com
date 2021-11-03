import React, { Children } from 'react';

import classNames from 'classnames';

import styles from './drift-navi.module.css';

export default function DriftNav({ children, postion = [], ...extra }) {
    return (
        <div className={classNames(styles.root, styles.demo, postion)} {...extra}>
            {Children.map(children, (child, index) => (
                <div className={styles.item} key={index}>{child}</div>
            ))}
        </div>
    );
};