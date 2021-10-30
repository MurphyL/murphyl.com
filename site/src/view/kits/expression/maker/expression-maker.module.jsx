import React, { Fragment } from "react";

import { useParams } from "react-router-dom";

import { Helmet } from 'react-helmet-async';

import styles from './expression-maker.module.css';

function MarkerLayout({ title, children }) {
    return (
        <Fragment>
            <Helmet>
                <title>{title}构造器 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>
                {children}
            </div>
        </Fragment>
    );
}

// https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm
export function CronExpressionMaker() {
    return (
        <MarkerLayout title="CronTab 表达式">
            <div className={styles.cron}>
                <span>crontab</span>
            </div>
        </MarkerLayout>
    );
}

// https://docs.docker.com/reference/
export function DockerCommandMaker() {
    return (
        <MarkerLayout title="Docker 命令">
            <div className={styles.docker}>
                <select>
                    <option value="docker">Docker</option>
                    <option value="docker-compose">Docker Compose</option>
                </select>
            </div>
        </MarkerLayout>
    );
}

export default function ExpressionMaker() {
    const { unique } = useParams();
    return unique;
}