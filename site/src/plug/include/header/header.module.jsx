import React, { useState } from 'react';
import classNames from 'classnames';

import { Link } from "react-router-dom";

import styles from './header.module.css';

const navItems = [{
    url: '/',
    label: '首页'
}, {
    url: '/topics',
    label: '主题'
}, {
    url: '/blog',
    label: '博客'
}, {
    url: '/about',
    label: '关于'
}];


export default function Header({ className, ...extra }) {
    const [show, setShow] = useState(false);
    return (
        <header className={classNames(styles.root, className)} {...extra}>
            <Link className={styles.logo}  to="/">
                {/* <img src={process.env.REACT_APP_LEGO} alt={process.env.REACT_APP_TITLE} /> */}
                <b>{process.env.REACT_APP_TITLE}</b>
            </Link>
            <nav className={`${styles.navi} ${show}`}>
                {navItems && navItems.map((item, index) => (
                    <Link key={index} to={`${item.url || '/'}`} onClick={() => setShow(false)}>{item.label}</Link>
                ))}
                <span className={styles.trigger} onClick={() => setShow(!show)}>=</span>
            </nav>
        </header>
    );
}
