import { useEffect } from 'react';
import { Link } from "wouter";

import items from 'data/navi/top.js';

import styles from './header.module.css';

const makeUrl = ({group, page = false}) => {
    return page ? `/${group}` : `/group/${group}`
};

export default function Header() {
    useEffect(() => {
        console.log(items);
        console.log(process.env);
    }, []);
    return (
        <header className={styles.root}>
            <figure className={styles.logo}>
                <Link href="/">{process.env.REACT_APP_TITLE}</Link>
            </figure>
            <nav className={styles.navi}>
                {(items || []).map((item, index) => (
                    <Link key={index} className="item" href={makeUrl(item)}>{item.label}</Link>
                ))}
            </nav>
        </header>
    )
}