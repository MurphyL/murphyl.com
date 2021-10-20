import React from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames';

import styles from './footer.module.css';

export default function Footer({ className, ...extra }) {
    return (
        <footer className={classNames(className, styles.root)} {...extra}>
            <div className={styles.sitemap}>
                <dl className={classNames(styles.section, styles.navi)}>
                    <dt>站点地图</dt>
                    <dd>
                        <ul>
                            <li><Link to="/blog" rel="noopener noreferrer">博客</Link></li>
                            <li><Link to="/notebook" rel="noopener noreferrer">笔记</Link></li>
                        </ul>
                    </dd>
                </dl>
                <dl className={classNames(styles.section, styles.links)}>
                    <dt>友情链接</dt>
                    <dd>
                        <ul>
                            <li><a href="https://cijian.us" target="_blank" rel="noopener noreferrer">此间·我们</a></li>
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