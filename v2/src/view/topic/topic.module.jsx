import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import simpleIcons from 'simple-icons';

import axios from 'axios';

import post from './topic-post.module.css';

export function TopicPost() {
    const { unique } = useParams();
    const [meta, setMeta] = useState({ loading: '数据加载中……' });
    useEffect(() => {
        axios.get(`/data/topic/${unique}.json`).then(({ status, data }) => {
            status === 200 && setMeta(data);
        });
    }, [unique]);
    if (meta.loading) {
        return meta.loading;
    }
    console.log('topic', unique, meta);
    const { hex: color, path } = simpleIcons.Get(meta.icon || unique);
    return (
        <div className={post.root} style={{'--theme-color': `#${color}`}}>
            <div className={post.profile}>
                <div className={post.logo}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>{unique}</title>
                        <path d={path} fill={`#${color}`} />
                    </svg>
                </div>
                <div className={post.meta}>
                    <h3>{meta.label}</h3>
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
    return (
        <div>topic - list</div>
    );
};