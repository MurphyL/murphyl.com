import React, { useState } from 'react';

import { Link } from "react-router-dom";

import styles from './header.module.css';

const navItems = [{
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
                <figure className={styles.logo}>
                    <img src={process.env.REACT_APP_LEGO} alt="logo" />
                    <Link to="/">{process.env.REACT_APP_TITLE}</Link>
                </figure>
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
