import React, { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { selectorFamily, useRecoilValue } from 'recoil';
import axios from 'axios';
import { get as pathGet } from 'object-path';
// import simpleIcons from 'simple-icons';
import { fetchGraphQlMapper, callGithubAPI } from 'plug/extra/rest_utils.jsx';
import { parseTOML, resolveToml } from 'plug/extra/rest_utils.jsx';

import styles from './topic.module.css';

const metaQuery = selectorFamily({
    key: 'meta',
    get: () => () => resolveToml(axios.get('/data/toml/topic/topics.toml'), '主题元')
});

const topicQuery = selectorFamily({
    key: 'topic',
    get: (url) => () => resolveToml(axios.get(url), '主题')
});

function TopicCard({  card }) {
    return (
        <div className={styles.card}>
            <div className={styles.card_container}>
                <div className={styles.title}>
                    <Link to={`/topics/${card.unique}`}>{card.title || '这里什么也没有！'}</Link>
                </div>
                <div className={styles.desc}>{card.desc || '这里什么也没有！'}</div>
            </div>
        </div>
    );
};

function TopicGroup({ id, bodyText }) {
    const { unique, title, items } = parseTOML(bodyText);
    return (
        <div className={styles.group} data-group={id} data-unique={unique}>
            <h3 className={styles.group_title}>{title || '无标题'}</h3>
            <div className={styles.cards}>
                {(items || []).map((card, index) => (
                    <TopicCard key={index} card={card} />
                ))}
            </div>
        </div>
    );
};

export function TopicPost() {
    const { unique } = useParams();
    console.log('unique', `X-TOPIC/${unique.toUpperCase()}`);
    return (
        <div>Hello</div>
    );
};


export function TopicPostX() {
    const { group, unique } = useParams();
    const topics = useRecoilValue(metaQuery());
    const topic = useRecoilValue(topicQuery(`/data/toml/topic/${unique}.toml`));
    const meta = (topics[group].items || []).find(x => x.unique === unique);
    return (
        (meta && meta.loading) ? (meta.loading) : (
            <Fragment>
                <Helmet>
                    <title>{meta.title} - 主题 - {process.env.REACT_APP_TITLE}</title>
                </Helmet>
                <div className={styles.post}>
                    <div className={styles.profile}>
                        <div className={styles.logo}>
                            {/* {meta.simple && (
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <title>{meta.simple.title}</title>
                                    <path d={meta.simple.path} fill={`#${meta.simple.color}`} />
                                </svg>
                            )} */}
                        </div>
                        <div className={styles.meta}>
                            <h3>{meta.title}</h3>
                            <p>{meta.desc || '这里啥也没有'}</p>
                        </div>
                    </div>
                    <div className={styles.post_content}>
                        {topic.loading ? topic.loading : (
                            <ul>
                                {(topic.items || []).map((item, index) => (
                                    <li key={index}>
                                        {item.unique ? (
                                            <Link to={`/post/${item.unique}.md`}>{item.title}</Link>
                                        ) : (
                                            <span>{item.title}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </Fragment>
        )
    );
};


export function TopicList() {
    const graphql = useRecoilValue(fetchGraphQlMapper());
    const fetched = useRecoilValue(callGithubAPI({
        graphql: pathGet(graphql, ['query-topic-issues', '_cdata']),
        tags: (process.env.REACT_APP_GHP_TOPIC_TAG || 'X-TOML').split(','),
    }));
    const [topic] = pathGet(fetched, 'data.repository.issues.nodes');
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
