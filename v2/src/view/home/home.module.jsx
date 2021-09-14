import React from 'react';

import NavLayout from 'plug/layout/nav_layout/nav_layout.module.jsx';

import styles from './home.module.css';

export default function Home() {
    return (
        <NavLayout>
            <div className={styles.root}>
                <h2>嘿，你好，我是MurphyL！</h2>
                <p>欢迎来访我的个人主页！</p>
            </div>
        </NavLayout>
    );
}
