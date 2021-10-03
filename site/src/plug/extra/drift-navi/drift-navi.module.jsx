import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './drift-navi.module.css';

export default function DriftNav({ postion = 'rb', role="component", links = [] }) {
    if(role === 'demo') {
        console.log('demo component');
    }
    return (
        <div className={classNames(styles.root, styles.demo)} data-postion={postion} data-role={role}>
            {links.map((nav, index) => (
                <Link key={index} to={nav.link}>{nav.label}</Link>
            ))}
        </div>
    );
}