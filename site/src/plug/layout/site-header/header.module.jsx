import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";

import classNames from 'classnames';

import styles from './header.module.css';

const navItems = [{
    label: '首页',
    link: '/',
}, {
    label: '主题',
    link: '/topics',
}, {
    label: '博客',
    link: '/blog',
}, {
    label: '关于',
    link: '/about',
}];

function NavItem(option) {
    return (
        <NavLink className={styles.navi_item} to={option.link} activeClassName={styles.selected} exact={true}>
            <span className={styles.navi_text}>{option.label}</span>
        </NavLink>
    );
}

export default function Header({ className, ...extra }) {
    const [show, setShow] = useState(false);
    return (
        <header className={classNames(className, styles.root)} {...extra}>
            <Link className={styles.logo} to="/">
                {/* <img src={process.env.REACT_APP_LEGO} alt={process.env.REACT_APP_TITLE} /> */}
                <b>{process.env.REACT_APP_TITLE}</b>
            </Link>
            <nav className={classNames(styles.navi, { show } )}>
                {navItems && navItems.map((item, index) => (
                    <NavItem key={index} {...item} />
                ))}
                <span className={styles.trigger} onClick={() => setShow(!show)}>=</span>
            </nav>
        </header>
    );
}
