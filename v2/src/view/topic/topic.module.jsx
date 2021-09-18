import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading, Error } from 'plug/include/status/status.module.jsx';
import simpleIcons from 'simple-icons';

import axios from 'axios';

import topics from 'data/topics/topics.json';

import post from './topic-post.module.css';
import list from './topic-list.module.css';

export function TopicPost() {
    const { unique } = useParams();
    const [meta, setMeta] = useState({ loading: <Loading /> });
    useEffect(() => {
        axios.get(`/data/topic/${unique}.json`).then(({ status, data }) => {
            status === 200 && setMeta(data);
        }).catch(err => {
            setMeta({ loading: <Error message={`数据加载错误：${err.message}`}  /> });
        });
    }, [unique]);
    if (meta.loading) {
        return meta.loading;
    }
    console.log('topic', unique, meta);
    const icon = simpleIcons.Get(meta.icon || unique);
    const { hex: color, title: slug, path } = icon || {};
    return (
        <div className={post.root} style={{'--theme-color': `#${color}`}}>
            <div className={post.profile}>
                <div className={post.logo}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>{slug}</title>
                        <path d={path} fill={`#${color}`} />
                    </svg>
                </div>
                <div className={post.meta}>
                    <h3>{meta.label || slug}</h3>
                    <p>{meta.desc || '这里啥也没有'}</p>
                </div>
            </div>
            <div>
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
            </div>

        </div>
    );
}


export function TopicList() {
    console.log('topic list', topics);
    return (
        <div className={list.root}>
            {(topics || []).map((group, groupIndex) => (
                <div key={groupIndex} className={list.card}>
                    <div>{group.title}</div>
                    <div className={list.cards}>
                        {(group.children || []).map((card, cardIndex) => (
                            <div key={cardIndex} className={list.card}>
                                <div className={list.container}>
                                    <div className={list.title}>
                                        <Link to={`/topics/${card.unique}`}>{card.title}</Link>
                                    </div>
                                    <div className={list.desc}>{card.desc || '这里什么也没有！'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};