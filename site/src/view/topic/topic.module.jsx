import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading, Error } from 'plug/include/status/status.module.jsx';
import simpleIcons from 'simple-icons';

import axios from 'axios';

import topics from 'data/topics/topics.json';

import styles from './topic.module.css';


const mapping = {};

topics.forEach(({ title: group, children = [] }) => {
    children.forEach((topic) => {
        const icon = simpleIcons.Get(topic.icon || topic.unique);
        if (icon) {
            const { title, path, hex: color } = icon;
            topic.simple = { title, path, color };
        }
        if (topic.unique) {
            mapping[topic.unique] = Object.assign(topic, { group });
        }
    });
});

function TopicCard({ card }) {
    return (
        <div className={styles.card}>
            <div className={styles.card_container}>
                {card.simple && (
                    <svg className={styles.icon} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>{card.simple.title}</title>
                        <path d={card.simple.path} fill={`#${card.simple.color}`} />
                    </svg>
                )}
                <div className={styles.title}>
                    <Link to={`/topics/${card.unique}`}>{card.title || '这里什么也没有！'}</Link>
                </div>
                <div className={styles.desc}>{card.desc || '这里什么也没有！'}</div>
            </div>
        </div>
    );
}

export function TopicPost() {
    const { unique } = useParams();
    const [meta, setMeta] = useState({ loading: <Loading /> });
    useEffect(() => {
        axios.get(`/data/topic/${unique}.json`).then(({ status, data }) => {
            status === 200 && setMeta({ ...mapping[unique], children: data || [] });
        }).catch(err => {
            setMeta({ ...mapping[unique], error: <Error message={`没有相关主题的文章（${err.message}）`} /> });
        });
    }, [unique]);
    if (meta.loading) {
        return meta.loading;
    }
    console.log('topic', unique, meta);
    return (
        <div className={styles.post}>
            <div className={styles.profile}>
                <div className={styles.logo}>
                    { meta.simple && (
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <title>{meta.simple.title}</title>
                            <path d={meta.simple.path} fill={`#${meta.simple.color}`} />
                        </svg>
                    )}
                </div>
                <div className={styles.meta}>
                    <h3>{meta.title}</h3>
                    <p>{meta.desc || '这里啥也没有'}</p>
                </div>
            </div>
            <div className={styles.post_content}>
                {meta.error ? meta.error : (
                    <ul>
                        {(meta.children || []).map((item, index) => (
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
    );
}


export function TopicList() {
    console.log('topic list', topics);
    return (
        <div className={styles.list}>
            {(topics || []).map((group, groupIndex) => (
                <div key={groupIndex} className={styles.group}>
                    <h3 className={styles.group_title}>{group.title || '无标题'}</h3>
                    <div className={styles.cards}>
                        {(group.children || []).map((card, cardIndex) => (
                            <TopicCard card={card} key={cardIndex} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};