import React, { useContext, useState } from 'react';
import { Link, NavLink } from "react-router-dom";

// import icons from 'simple-icons';
import classNames from 'classnames';
import { get as pathGet } from 'object-path';

import { MapperContext } from 'plug/extra/x-context';

import styles from './header.module.css';

function NavItem(option) {
    return (
        <NavLink className={styles.navi_item} to={option.link}>
            <span className={styles.navi_text}>{option.label}</span>
        </NavLink>
    );
}

export default function Header({ className, ...extra }) {
    const [show, setShow] = useState(false);
    const { site } = useContext(MapperContext);
    const items = pathGet(site, 'headr.navi') || [];
    // const { path, slug } = icons.Get('github');
    return (
        <header className={classNames(className, styles.root)} {...extra}>
            <Link className={styles.logo} to="/">
                {/* <img src={process.env.REACT_APP_LEGO} alt={process.env.REACT_APP_TITLE} /> */}
                <b>{process.env.REACT_APP_TITLE}</b>
            </Link>
            <nav className={classNames(styles.navi, { show })}>
                {items.map((item, index) => (
                    <NavItem key={index} {...item} />
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
}
