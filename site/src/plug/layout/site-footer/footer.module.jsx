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
            <div className={styles.navi}>
                {Object.entries(footer).map(([key, {label, links}], index) => (
                    <dl key={index} className={classNames(styles.section, styles[key])} data-group={key}>
                        <dt>{label}</dt>
                        <dd>
                            <ul>
                                {(links || []).map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.link} rel="noopener noreferrer">{item.label}</Link>
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