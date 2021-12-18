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
            {left && Array.isArray(left) && left.length > 0 && (
                <nav className={classNames(styles.header_navi_group, styles.header_navi_group_left)}>
                    {left.map(({ path, name }, index) => (
                        <NavLink key={index} to={path}>{name || path}</NavLink>)
                    )}
                </nav>
            )}
            {right && Array.isArray(right) && right.length > 0 && (
                <nav className={classNames(styles.header_navi_group, styles.header_navi_group_right)}>
                    {right.map(({ path, name }, index) => (
                        <NavLink key={index} to={path}>{name || path}</NavLink>)
                    )}
                </nav>
            )}
        </header>
    );
});

NaviHeader.displayName = 'BaseElement.NaviHeader';

export const Copyright = ({ className }) => {
    return (
        <div className={classNames(styles.copyright, className)}>
            <div>Copyright © 2020 {process.env.REACT_APP_TITLE}, All rights reserved. Host by <a href="https://vercel.com/" rel="noopener noreferrer" target="_blank">ZEIT.co</a></div>
        </div>
    );
};

Copyright.displayName = 'BaseElement.Copyright';
