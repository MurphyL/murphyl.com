import React from 'react';

import Header from 'plug/include/header/header.module.jsx';
import Footer from 'plug/include/footer/footer.module.jsx';

import styles from './site-layout.module.css';

export default function SiteLayout(props) {
    const { children } = props;
    return (
        <div className={styles.root}>
            <Header className={styles.container} data-role="header" />
            <main className={styles.container} data-role="main">
                {children}
            </main>
            <Footer className={styles.container}  data-role="footer" />
        </div>
    );
}