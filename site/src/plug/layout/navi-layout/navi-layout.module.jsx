import React from 'react';
import { Link, Outlet } from "react-router-dom";

import classNames from 'classnames';

import styles from './navi-layout.module.css';

export default function TabLayout({ children, items = [] }) {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Link to="/">首页</Link>
                </div>
                <div className={classNames(styles.group, styles.left)}>
                    {items.map(({ path, name }, index) => (<Link key={index} to={path}>{name || path}</Link>))}
                </div>
                <div className={classNames(styles.group, styles.right)}>

                </div>
            </div>
            <div className={styles.body}>
                {children ? children : <Outlet />}
            </div>
        </div>
    );
};
