import React, { useState } from 'react';

import { Link } from "react-router-dom";

import styles from './header.module.css';

const navItems = [{
    url: '/',
    label: '首页'
}, {
    url: '/docs',
    label: '文档'
}, {
    url: '/blog',
    label: '博客'
}, {
    url: '/about',
    label: '关于'
}];


export default function Header({ container }) {
    const [show, setShow] = useState(false);
    return (
        <header className={styles.root}>
            <div className={container}>
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
            </div>
        </header>
    );
}
