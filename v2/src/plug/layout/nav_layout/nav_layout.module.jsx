import React from 'react';

import Header from 'plug/include/header/header.module.jsx';
import Footer from 'plug/include/footer/footer.module.jsx';

import styles from './nav_layout.module.css';

export default function NavLayout(props) {
    const { children } = props;
    return (
        <div className={styles.root}>
            <Header container={styles.container} />
            <main className={styles.container}>
                {children}
            </main>
            <Footer container={styles.container} />
        </div>
    );
}