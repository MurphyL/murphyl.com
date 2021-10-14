import React, { Fragment } from 'react';

import Header from 'plug/layout/site-header/header.module.jsx';
import Footer from 'plug/layout/site-footer/footer.module.jsx';

import styles from './site-layout.module.css';

export default function SiteLayout({ children }) {
    return (
        <Fragment>
            <Header className={styles.root} data-role="header" />
            <main className={styles.root} data-role="main">
                {children}
            </main>
            <Footer className={styles.root} data-role="footer" />
        </Fragment>
    );
}