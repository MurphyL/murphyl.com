import React from "react";

import classNames from 'classnames';
import useDocumentTitle from '@rehooks/document-title';

import styles from './dynamic-page.module.css';

export default function DynamicPage({ className, title, children }) {
    useDocumentTitle(`${title || '未命名页面'} - ${process.env.REACT_APP_TITLE}`);
    return (
        <div className={classNames(styles.root, className)}>
            {children}
        </div>
    );
}