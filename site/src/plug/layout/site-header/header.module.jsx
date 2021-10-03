import React, { useState } from 'react';
import classNames from 'classnames';

import { Link } from "react-router-dom";

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
    label: '工具',
    children: [{
        label: '代码片段',
        link: '/snippet',
    }]
}, {
    label: '关于',
    link: '/about',
}];

function NavItem(option) {
    return (typeof (option.link) === 'string') ? (
        <Link className={styles.navi_item} to={option.link}>
            <span className={styles.navi_text}>{option.label}</span>
        </Link>
    ) : (
        <span className={styles.navi_item}>
            <span className={styles.navi_text}>{option.label}</span>
            <div className={styles.navi_hover}>
                <ul>
                    {option.children.map((nav, index) => (
                        <li key={index}>
                            <Link to={nav.link}>{nav.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </span>
    )
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
