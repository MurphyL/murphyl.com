import React, { useEffect, useState, createContext, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import TOML from '@iarna/toml';
// import simpleIcons from 'simple-icons';

import { Loading, Error } from 'plug/include/status/status.module.jsx';

import SiteLayout from "plug/template/site-layout/site-layout.module.jsx";

import styles from './topic.module.css';

export const TopicContext = createContext();

export const fetchTopic = async () => {
    const { status, data } = await axios.get(`/data/topics.toml`);
    return (status === 200) ? TOML.parse(data) : { loading: <Error message="请求数据出错" /> };
};

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
    const [meta, setMeta] = useState({ loading: <Loading /> });
    useEffect(() => {
        fetched.then((topics) => {
            setMeta({ ...(topics[group].items || []).find(x => x.unique === unique) })
        }).catch(err => {
            setMeta({ loading: <Error message={`没有相关主题的文章（${err.message}）`} /> });
        });
    }, [fetched, group, unique]);
    console.log('topic', unique, meta);
    return (
        <SiteLayout>
            {meta.loading ? (meta.loading) : (
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
                        {meta.error ? meta.error : (
                            <ul>
                                {(meta.items || []).map((item, index) => (
                                    <li key={index}>
                                        {item.unique ? (
                                            <Link to={`/post/${item.unique}.md`}>{item.label}</Link>
                                        ) : (
                                            <span>{item.label}</span>
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