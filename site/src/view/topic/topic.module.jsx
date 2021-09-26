import React, { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { selectorFamily, useRecoilValue } from 'recoil';
import axios from 'axios';
// import simpleIcons from 'simple-icons';

import { resolveToml } from 'plug/extra/rest_utils.jsx';

import styles from './topic.module.css';

const metaQuery = selectorFamily({
    key: 'meta', 
    get: () => () => resolveToml(axios.get('/data/toml/topic/topics.toml'), '主题元')
});

const topicQuery = selectorFamily({
    key: 'topic', 
    get: (url) => () => resolveToml(axios.get(url), '主题')
});

function TopicCard({ group, card }) {
    return (
        <div className={styles.card}>
            <div className={styles.card_container}>
                {/* {card.simple && (
                    <svg className={styles.icon} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>{card.simple.title}</title>
                        <path d={card.simple.path} fill={`#${card.simple.color}`} />
                    </svg>
                )} */}
                <div className={styles.title}>
                    <Link to={`/topics/${group}/${card.unique}`}>{card.title || '这里什么也没有！'}</Link>
                </div>
                <div className={styles.desc}>{card.desc || '这里什么也没有！'}</div>
            </div>
        </div>
    );
};

export function TopicPost() {
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
    const topics = useRecoilValue(metaQuery());
    return (
        (topics && topics.loading) ? (topics.loading) : (
            <Fragment>
                <Helmet>
                    <title>主题 - {process.env.REACT_APP_TITLE}</title>
                </Helmet>
                <div className={styles.list}>
                    {(Object.entries(topics) || []).map(([unique, group], groupIndex) => (
                        <div key={groupIndex} className={styles.group}>
                            <h3 className={styles.group_title}>{group.title || '无标题'}</h3>
                            <div className={styles.cards}>
                                {(group.items || []).map((card, cardIndex) => (
                                    <TopicCard group={unique} card={card} key={cardIndex} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Fragment>
        )
    );
};
