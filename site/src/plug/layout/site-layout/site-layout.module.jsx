import React, { useState } from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";

import classNames from 'classnames';

import { useMetaInfo } from 'plug/hooks';

import styles from './site-layout.module.css';

const SITE_META = useMetaInfo('src/data/toml/site.toml') || {};

function Header({ className, meta = {}, ...extra }) {
    const [show, setShow] = useState(false);
    const { pathname } = useLocation();
    return (
        <header className={classNames(className, styles.header)} {...extra}>
            <Link className={styles.logo} to="/">
                <span>{process.env.REACT_APP_TITLE}</span>
            </Link>
            <nav className={classNames(styles.navi, { show })}>
                {(meta.navi || []).map((item, index) => (
                    <Link key={index} to={item.link} className={classNames(styles.navi_item, { [styles.selected]: pathname === item.link })}>
                        <span className={styles.navi_text}>{item.label}</span>
                    </Link>
                ))}
                <span className={styles.trigger} onClick={() => setShow(!show)}>=</span>
            </nav>
        </header>
    );
};

function Footer({ className, meta = {}, ...extra }) {
    return (
        <footer className={classNames(className, styles.footer)} {...extra}>
            <div className={styles.navi}>
                {Object.entries(meta).map(([key, { label, links }], index) => (
                    <dl key={index} className={classNames(styles.section, styles[key])} data-group={key}>
                        <dt>{label}</dt>
                        <dd>
                            <ul>
                                {(links || []).map((item, index) => (
                                    <li key={index}>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                                            <span>{item.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </dl>
                ))}
            </div>
            <div className={styles.copyright}>
                <div>Copyright © 2020 {process.env.REACT_APP_TITLE}, All rights reserved. Host by <a href="https://vercel.com/" rel="noopener noreferrer" target="_blank">ZEIT.co</a></div>
            </div>
        </footer>
    );
}

export default function SiteLayout() {
    const { header, footer } = SITE_META;
    return (
        <div className={styles.root}>
            <Header meta={header} />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer meta={footer} />
        </div>
    );
}