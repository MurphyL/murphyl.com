import { forwardRef } from 'react';
import { Link, NavLink } from "react-router-dom";

import classNames from 'classnames';

import styles from './base-element.module.css';

export function Logo() {
    return (
        <Link className={styles.logo} to="/">{process.env.REACT_APP_TITLE}</Link>
    );
}


export const NaviHeader = forwardRef(({ left = [], right = [] }, ref) => {
    return (
        <header className={classNames(styles.navi, styles.header)} ref={ref}>
            <Logo />
            <nav className={classNames(styles.header_navi_group, styles.header_navi_group_left)}>
                {Array.isArray(left) && left.map(({ path, name }, index) => (
                    <NavLink key={index} to={path}>{name || path}</NavLink>)
                )}
            </nav>
            <nav className={classNames(styles.header_navi_group, styles.header_navi_group_right)}>
                {Array.isArray(right) && right.map(({ path, name }, index) => (
                    <NavLink key={index} to={path}>{name || path}</NavLink>)
                )}
            </nav>
        </header>
    );
});


NaviHeader.displayName = 'BaseElement.NaviHeader';