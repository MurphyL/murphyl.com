import React, { Fragment } from "react";
import { Link, useParams } from "react-router-dom";

import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';

import { get as pathGet } from 'object-path';
// import simpleIcons from 'simple-icons';
import { callGithubAPI } from 'plug/extra/rest_utils.jsx';
import { parseTOML } from 'plug/extra/rest_utils.jsx';

import styles from './topic.module.css';

function TopicCard({ card }) {
    return (
        <div className={styles.card}>
            <div className={styles.card_container}>
                <div className={styles.title}>
                    <Link to={{ pathname: `/topics/${card.unique}`, search: '?from=topic-list', state: card }}>{card.title || '这里什么也没有！'}</Link>
                </div>
                <div className={styles.desc}>{card.desc || '这里什么也没有！'}</div>
            </div>
        </div>
    );
};

function TopicGroup({ id, bodyText }) {
    const { unique, title, items } = parseTOML(bodyText);
    return (
        <div className={styles.card_group} data-group={id} data-unique={unique}>
            <h3 className={styles.group_title}>{title || '无标题'}</h3>
            <div className={styles.group_cards}>
                {(items || []).map((card, index) => (
                    <TopicCard key={index} card={card} />
                ))}
            </div>
        </div>
    );
};

export function TopicPost() {
    const { unique } = useParams();
    const fetched = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: `X-POST/${unique.toUpperCase()}`,
    }));
    console.log(`X-POST/${unique.toUpperCase()}`, fetched);
    return (
        <div>post</div>
    );
};

export function TopicList() {
    const fetched = useRecoilValue(callGithubAPI({
        key: 'query-issue-comments',
        ghp_labels: 'X-TOML/TOPIC',
    }));
    const [topic] = pathGet(fetched || {}, 'data.repository.issues.nodes');
    console.log('topic issues', topic);
    return topic ? (
        <Fragment>
            <Helmet>
                <title>{topic.title} - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.list}>
                {topic.comments && (topic.comments.nodes || []).map((group, index) => (
                    <TopicGroup key={index} {...group} />
                ))}
            </div>
        </Fragment>
    ) : (
        <div>加载错误</div>
    );
};
