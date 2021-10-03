import React, { Fragment } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';

import { get as pathGet } from 'object-path';
// import simpleIcons from 'simple-icons';
import { callGithubAPI } from 'plug/extra/rest_utils.jsx';
import { parseTOML } from 'plug/extra/rest_utils.jsx';

import styles from './topic.module.css';

function TopicCard({ group, card }) {
    return (
        <div className={styles.card}>
            <div className={styles.card_container}>
                <div className={styles.title}>
                    <Link to={{
                        pathname: `/topics/${group}/${card.unique}`,
                        state: { [`card-${card.unique}`]: card }
                    }}>{card.title || '这里什么也没有！'}</Link>
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
            <h3 className={styles.group_title}>
                <Link to={`/topics/${unique}`}>{title || '无标题'}</Link>
            </h3>
            <div className={styles.card_list}>
                {(items || []).map((card, index) => (
                    <TopicCard key={index} group={unique} card={card} />
                ))}
            </div>
        </div>
    );
};

function TopicMeta({ topic }) {
    return (
        <Fragment>
            <Helmet>
                <title>{topic.title} - 分类文章 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.meta}>
                <h3>{topic.title}</h3>
                <p>{topic.desc}</p>
            </div>
        </Fragment>
    );
}

function AjaxTopicMeta({ unique }) {
    const fetched = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: `X-POST/${unique.toUpperCase()}`,
    }));
    console.log(fetched);
    return (
        <Fragment>
            <span>ajax - {unique}</span>
            <TopicMeta />
        </Fragment>
    );
};

export function TopicGroupViewer() {
    const { group } = useParams();
    return (
        <div className={styles.group_viewer}>group viewer - {group}</div>
    );
};

export function TopicDetails() {
    const { unique } = useParams();
    const { state } = useLocation();
    const fetched = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: `X-POST/${unique.toUpperCase()}`,
    }));
    const topics = pathGet(fetched || {}, 'data.repository.issues.nodes');
    const meta = (state || {})[`card-${unique}`]
    console.log(`X-POST/${unique.toUpperCase()}`, meta, topics);
    return (
        <Fragment>
            {meta ? <TopicMeta topic={meta} /> : <AjaxTopicMeta unique={unique} />}
            <ul>
                {(topics || []).map((topic, index) => (
                    <li key={index}>
                        <Link to={`/post/${topic.number}`}>{topic.title}</Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export function TopicGroupList() {
    const fetched = useRecoilValue(callGithubAPI({
        key: 'query-issue-comments',
        ghp_labels: 'X-TOPIC',
    }));
    const [topic] = pathGet(fetched || {}, 'data.repository.issues.nodes');
    console.log('topic', topic);
    return topic ? (
        <Fragment>
            <Helmet>
                <title>{topic.title} - 主题 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.group_list}>
                {topic.comments && (topic.comments.nodes || []).map((group, index) => (
                    <TopicGroup key={index} {...group} />
                ))}
            </div>
        </Fragment>
    ) : (
        <div>配置数据加载错误</div>
    );
};
