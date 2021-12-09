import React, { Fragment, useContext, useState } from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";

import classNames from 'classnames';
import { JSONPath } from 'jsonpath-plus-browser';

import { MapperContext } from 'plug/extra/x-context';

import styles from './site-layout.module.css';

function Header({ className, ...extra }) {
    const [show, setShow] = useState(false);
    const { pathname } = useLocation();
    const { site } = useContext(MapperContext);
    return (
        <header className={classNames(className, styles.header)} {...extra}>
            <Link className={styles.logo} to="/">
                <span>{process.env.REACT_APP_TITLE}</span>
            </Link>
            <nav className={classNames(styles.navi, { show })}>
                {(JSONPath({ json: site, path: '$.headr.navi', wrap: false }) || []).map((item, index) => (
                    <Link key={index} to={item.link} className={classNames(styles.navi_item, { [styles.selected]: pathname === item.link })}>
                        <span className={styles.navi_text}>{item.label}</span>
                    </Link>
                ))}
                <span className={styles.trigger} onClick={() => setShow(!show)}>=</span>
            </nav>
        </header>
    );
};

function Footer({ className, ...extra }) {
    const { site } = useContext(MapperContext);
    return (
        <footer className={classNames(className, styles.footer)} {...extra}>
            <div className={styles.navi}>
                {Object.entries(JSONPath({ json: site, path: '$.footer', wrap: false }) || {}).map(([key, { label, links }], index) => (
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
    return (
        <Fragment>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </Fragment>
    );
}