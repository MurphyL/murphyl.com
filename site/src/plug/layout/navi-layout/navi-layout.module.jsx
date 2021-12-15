import React, { useState } from 'react';
import { Outlet } from "react-router-dom";

import classNames from 'classnames';

import { NaviHeader } from '../base-element/base-element.module';

import styles from './navi-layout.module.css';

export default function NaviLayout({ className, navi = [] }) {
    const [items, setItems] = useState([]);
    return (
        <div className={classNames(styles.root, className)}>
            <NaviHeader left={navi.concat(items)} />
            <main className={styles.body}>
                <Outlet context={{ setNaviItems: setItems }} />
            </main>
        </div>
    );
};