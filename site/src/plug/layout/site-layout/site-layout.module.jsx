import React from 'react';
import { Link, Outlet } from "react-router-dom";

import classNames from 'classnames';

import { useMetaInfo } from 'plug/hooks';

import { NaviHeader, Copyright } from '../base-element/base-element.module';

import styles from './site-layout.module.css';

const SITE_META = useMetaInfo('src/data/toml/site.toml') || {};


function Footer({ className, meta = {}, ...extra }) {
    return (
        <footer className={classNames(className, styles.footer)} {...extra}>
            <div className={styles.navi}>
                {Object.entries(meta).map(([key, { name, links }], index) => (
                    <dl key={index} className={classNames(styles.section, styles[key])} data-group={key}>
                        <dt>{name}</dt>
                        <dd>
                            <ul>
                                {(links || []).map(({name, path}, index) => (
                                    <li key={index}>
                                        {(/^http/.test(path)) ? (
                                            <a href={path} target="_blank" rel="noopener noreferrer">{name}</a>
                                        ) : (
                                            <Link to={path}>{name}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </dl>
                ))}
            </div>
            <Copyright className={styles.copyright} />
        </footer>
    );
}

export default function SiteLayout() {
    const { header = {}, footer } = SITE_META;
    return (
        <div className={styles.root}>
            <NaviHeader right={header.navi} />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer meta={footer} />
        </div>
    );
}