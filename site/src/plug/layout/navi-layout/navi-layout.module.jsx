import React, { useState } from 'react';
import { Outlet } from "react-router-dom";

import classNames from 'classnames';

import { NaviHeader, Copyright } from '../base-element/base-element.module';

import styles from './navi-layout.module.css';

const RIGHT = [{
    name: 'Home',
    path: '/'
}, {
    name: 'All kits',
    path: '/kits/'
}];


// TabView - https://codesandbox.io/s/festive-benz-ocwfi?file=/src/tab/tab.module.jsx
export default function NaviLayout({ className, navi = [] }) {
    const [items, setItems] = useState([]);
    return (
        <div className={classNames(styles.root, className)}>
            <NaviHeader left={navi.concat(items)} right={RIGHT} />
            <main className={styles.body}>
                <Outlet context={{ setNaviItems: setItems }} />
            </main>
            <footer className={styles.copyright}>
                <Copyright />
            </footer>
        </div>
    );
};