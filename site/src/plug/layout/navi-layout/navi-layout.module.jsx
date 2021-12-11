import React, { useState, useRef } from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";

import { useComponentSize } from 'plug/hooks';

import classNames from 'classnames';

import styles from './navi-layout.module.css';

export default function NaviLayout({ className }) {
    const [items, setItems] = useState([]);
    const { pathname } = useLocation();
    const headerInstance = useRef();
    const { height } = useComponentSize(headerInstance);
    console.log(pathname);
    const match = (path) => pathname.endsWith(path.replace(/^\./, ''));
    return (
        <div className={classNames(styles.root, className)} style={{ '--navi-header-height': `${height}px` }}>
            <div className={styles.header} ref={headerInstance}>
                <div className={styles.logo}>
                    <Link to="/">首页</Link>
                </div>
                <div className={classNames(styles.group, styles.left)}>
                    {Array.isArray(items) && items.map(({ path, name }, index) => (
                        <Link key={index} className={classNames({ [styles.current]: match(path) })} to={path}>{name || path}</Link>)
                    )}
                </div>
                <div className={classNames(styles.group, styles.right)}>

                </div>
            </div>
            <div className={styles.body}>
                <Outlet context={{ setNaviItems: setItems }} />
            </div>
        </div>
    );
};