import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import * as matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';

import { Loading } from 'plug/include/status/status.module';

import markdownOptions from 'plug/extra/markdown/markdown.module.jsx';

import NavLayout from 'plug/template/site-layout/site-layout.module.jsx';

import './post.module.css';


export default function Post() {
    const { unique } = useParams();
    const [code, setCode] = useState(-1);
    const [post, setPost] = useState('');
    useEffect(() => {
        axios.get(`/markdown/${unique}`).then(({ status, data }) => {
            setCode(status);
            setPost(data);
        })
    }, [unique]);
    if (code < 0) {
        return (
            <NavLayout>
                <Loading />
            </NavLayout>
        );
    }
    if (code !== 200 || post === '') {
        return (
            <div>数据加载错误…</div>
        );
    }
    const { data: meta, content } = matter(post);
    return (
        <NavLayout>
            <article>
                {!meta.truncate && <h2>{meta.title || unique}</h2>}
                <section>
                    <Markdown children={content || ''} options={markdownOptions} />
                </section>
            </article>
        </NavLayout>
    );
};