import { Fragment } from 'react';

import { Link } from "wouter";

import items from 'data/navi/top.js';

import styles from './group.module.css';

export default function Group({ params }) {
    return (
        <dl className={styles.root}>
            {(items || []).filter(item => item.group === params.name).map((group, gi) => (
                <Fragment key={gi}>
                    <dt>{group.label}</dt>
                    <dd>
                        <ul>
                            {(group.children || []).map((navi, ni) => (
                                <li key={ni} data-index={ni}>
                                    <Link href={navi.link}>{navi.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </dd>
                </Fragment>
            ))}
        </dl>
    );
}