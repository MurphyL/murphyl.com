import React, { useMemo } from 'react';
import { Link, Outlet } from "react-router-dom";

import classNames from 'classnames';

import styles from './navi-layout.module.css';

export default function NaviLayout({ className, children, items = [] }) {
    return (
        <div className={classNames(styles.root, className)}>
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

NaviLayout.from = ({ path }, items) => {
    const navi = items.filter(item => item.name).map(({ name, index, path }) => ({
        name, path: `./${index ? '' : path}`
    }));
    return {
        path,
        element: <NaviLayout items={navi} />,
        children: items.concat({
            path: '*',
            element: <div>404</div>

        })
    }
};