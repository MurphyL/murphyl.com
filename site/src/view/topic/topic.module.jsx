import React, { useEffect, useState, createContext, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import TOML from '@iarna/toml';
// import simpleIcons from 'simple-icons';

import { Loading, Error } from 'plug/include/status/status.module.jsx';

import SiteLayout from "plug/template/site-layout/site-layout.module.jsx";

import styles from './topic.module.css';

export const TopicContext = createContext();

const fetch = (url, label = '') => {
    return axios.get(url).then(({ status, data }) => {
        return (status === 200) ? TOML.parse(data) : { loading: <Error message={ `请求${label}数据出错` } /> };
    }).catch(err => {
        return { loading: <Error message={ `请求${label}数据出错：${err.message}` }  /> };
    });
    
};

export const fetchTopic = () => fetch('/data/toml/topic/topics.toml', '主题元');

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
    const fetched = useContext(TopicContext);
    const [topic, setTopic] = useState({ meta: { loading: <Loading /> }, topic: { loading: <Loading /> } });
    useEffect(() => {
        Promise.all([fetched, fetch(`/data/toml/topic/${unique}.toml`, '主题')]).then(([topics, topic]) => {
            setTopic({ 
                meta: (topics[group].items || []).find(x => x.unique === unique),
                ...topic
            });
        });
    }, [fetched, group, unique]);
    console.log('topic', unique, topic);
    return (
        <SiteLayout>
            {topic.meta.loading ? (topic.meta.loading) : (
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
                            <h3>{topic.meta.title}</h3>
                            <p>{topic.meta.desc || '这里啥也没有'}</p>
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
            )}
        </SiteLayout>
    );
};


export function TopicList() {
    const [topics, setTopics] = useState({ loading: <Loading /> });
    const fetched = useContext(TopicContext);
    useEffect(() => {
        fetched.then(setTopics);
    }, [fetched]);
    return (
        <SiteLayout>
            {topics.loading ? (topics.loading) : (
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
            )}
        </SiteLayout>
    );
};