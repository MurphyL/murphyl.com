import React, {Fragment} from 'react';
import { Helmet } from 'react-helmet-async';

import classNames from 'classnames';

import styles from './home.module.css';

export default function Home({ className }) {
    return (
        <Fragment>
            <Helmet>
                <title>{process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={classNames(styles.root, className)}>
                <h2>嘿，你好，我是MurphyL！</h2>
                <p>欢迎来访我的个人主页！</p>
            </div>
        </Fragment>
    );
}
