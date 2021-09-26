import React, { useState } from 'react';
import classNames from 'classnames';

import { Link, useHistory } from "react-router-dom";

import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';

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
    label: '工具',
}, {
    label: '关于',
    child: '/about',
}];

const NavMenu = ({ label, child }) => {
    const history = useHistory();
    console.log(history);
    return (
        <Wrapper className={styles.item} tag="a">
            <Button className={styles.text}>{label}</Button>
            <Menu className={styles.hover}>
                <MenuItem>Hello</MenuItem>
            </Menu>
        </Wrapper>
    );
};

function NavItem({ label, child }) {
    return (typeof (child) === 'string') ? (
        <Link className={styles.item} to={`${child || '/'}`}>{label}</Link>
    ) : (
        <NavMenu label={label} />
    )
}

export default function Header({ className, ...extra }) {
    const [show, setShow] = useState(false);
    return (
        <header className={classNames(styles.root, className)} {...extra}>
            <Link className={styles.logo} to="/">
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
