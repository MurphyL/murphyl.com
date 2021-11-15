import React, { memo, useContext, useState } from 'react';
import { Link, useLocation } from "wouter";
// import icons from 'simple-icons';
import classNames from 'classnames';
import { get as pathGet } from 'object-path';

import { MapperContext } from 'plug/extra/x-context';

import styles from './header.module.css';

export default memo(function Header({ className, ...extra }) {
    const [show, setShow] = useState(false);
    const [ pathname ] = useLocation();
    const { site } = useContext(MapperContext);
    // const { path, slug } = icons.Get('github');
    return (
        <header className={classNames(className, styles.root)} {...extra}>
            <Link className={styles.logo} href="/">
                {/* <img src={process.env.REACT_APP_LEGO} alt={process.env.REACT_APP_TITLE} /> */}
                <a>{process.env.REACT_APP_TITLE}</a>
            </Link>
            <nav className={classNames(styles.navi, { show })}>
                {(pathGet(site, 'headr.navi') || []).map((item, index) => (
                    <Link key={index} href={item.link}>
                        <a className={classNames(styles.navi_item, { [styles.selected]: pathname === item.link })}>
                            <span className={styles.navi_text}>{item.label}</span>
                        </a>
                    </Link>
                ))}
                {/* <a className={styles.navi_item} href={`https://github.com`} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <path d={path} data-slug={slug} />
                    </svg>
                </a> */}
                <span className={styles.trigger} onClick={() => setShow(!show)}>=</span>
            </nav>
        </header>
    );
});
