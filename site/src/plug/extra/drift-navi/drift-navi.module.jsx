import React from 'react';
import { Link } from 'react-router-dom';

import styles from './drift-navi.module.css';

export default function DriftNav({ postion = 'rb', links = [] }) {
    return (
        <div className={styles.root} data-postion={postion}>
            {links.map((nav, index) => (
                <Link key={index} to={nav.link}>{nav.label}</Link>
            ))}
        </div>
    );
}