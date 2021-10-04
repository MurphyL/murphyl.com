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
    label: '工具',
    children: [{
        label: '代码片段',
        link: '/snippet',
    }, {
        label: '动态页面帮助',
        link: '/schema/view/SiteLayout/dynamic-page-manual',
    }]
}, {
    label: '关于',
    link: '/about',
}];

function NavItem(option) {
    return (typeof (option.link) === 'string') ? (
        <NavLink className={styles.navi_item} to={option.link} activeClassName={styles.selected} exact={true}>
            <span className={styles.navi_text}>{option.label}</span>
        </NavLink>
    ) : (
        <span className={styles.navi_item}>
            <span className={styles.navi_text}>{option.label}</span>
            <div className={styles.navi_hover}>
                <ul>
                    {option.children.map((nav, index) => (
                        <li key={index}>
                            <NavLink to={nav.link} activeClassName="selected">{nav.label}</NavLink>
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
