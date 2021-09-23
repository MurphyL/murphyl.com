import React, { useState } from 'react';
import classNames from 'classnames';

import { Link } from "react-router-dom";

import styles from './header.module.css';

const navItems = [{
    label: '首页',
    child: '/',
}, {
    label: '主题',
    child: '/topics',
}, {
    label: '博客',
    child: '/blog',
}, {
    child: (
        <span>工具</span>
    )
}, {
    label: '关于',
    child: '/about',
}];

function NavItem({label, child}) {
    return (!child || typeof(child) === 'string') ? (
        <Link to={`${child || '/'}`}>{label}</Link>
    ) : (
        <Link to={({pathname}) => pathname}>{ child }</Link>
    )
}

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
                    <NavItem key={index} {...item} />
                ))}
                <span className={styles.trigger} onClick={() => setShow(!show)}>=</span>
            </nav>
        </header>
    );
}
