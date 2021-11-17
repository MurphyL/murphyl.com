import React, { Fragment } from "react";

import { Helmet } from 'react-helmet-async';

import classNames from 'classnames';

import styles from './dynamic-page.module.css';

export default function DynamicPage({ className, title, children }) {
    return (
        <Fragment>
            <Helmet>
                <title>{title || '未命名页面'} - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={classNames(styles.root, className)}>
                {children}
            </div>
        </Fragment>
    );
}