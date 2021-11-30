import React from "react";

import classNames from 'classnames';

import styles from './dynamic-link.module.css';

export default function DynamicLink({ className, children, link }) {
    return <a className={classNames(styles.root, className)} href={link} target="_blank" rel="noopener noreferrer">{children}</a>;
}