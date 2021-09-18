import React from 'react';

import SiteLayout from 'plug/layout/site-layout/site-layout.module.jsx';

import styles from './home.module.css';

export default function Home() {
    return (
        <SiteLayout>
            <div className={styles.root}>
                <h2>嘿，你好，我是MurphyL！</h2>
                <p>欢迎来访我的个人主页！</p>
            </div>
        </SiteLayout>
    );
}
