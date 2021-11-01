import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { get as pathGet } from 'object-path';
import classNames from 'classnames';

import { MapperContext } from 'plug/extra/x-context';

import styles from './footer.module.css';

export default function Footer({ className, ...extra }) {
    const { site } = useContext(MapperContext);
    const footer = pathGet(site, 'footer') || {};
    return (
        <footer className={classNames(className, styles.root)} {...extra}>
            <div className={styles.sitemap}>
                <dl className={classNames(styles.section, styles.navi)}>
                    <dt>站点地图</dt>
                    <dd>
                        <ul>
                            {(footer.sitemap || []).map((item, index) => (
                                <li key={index}>
                                    <Link to={item.link} rel="noopener noreferrer">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </dd>
                </dl>
                <dl className={classNames(styles.section, styles.links)}>
                    <dt>友情链接</dt>
                    <dd>
                        <ul>
                            {(footer.links || []).map((item, index) => (
                                <li key={index}>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </dd>
                </dl>
            </div>
            <div className={styles.copyright}>
                <div>Copyright © 2020 {process.env.REACT_APP_TITLE}, All rights reserved. Host by <a href="https://vercel.com/" rel="noopener noreferrer" target="_blank">ZEIT.co</a></div>
            </div>
        </footer>
    );
}