import React, { useEffect, useState } from 'react';

import { useParams, useLocation } from "react-router-dom";

import lodashGet from 'lodash/get';

import Markdown from 'markdown-to-jsx';

import { Loading } from '../../../core/loading/loading';

import { getBlogDetails } from '../../../utils/murph_store';

import { revisePost } from '../../../utils/article_utils';

import { markdownOptions, highlightCodeBlock } from 'includes/mark_config.jsx';

import './blog_post.css';

const Post = () => {
    const { unique } = useParams();
    const { state } = useLocation();
    const [ local, setLocal ] = useState({ loading: true });
    useEffect(() => {
        if(state) {
            setLocal(Object.assign(state, { loading: false }));
            highlightCodeBlock();
        } else {
            getBlogDetails(unique).then((resp) => {
                console.log(resp);
                const post = lodashGet(resp, 'data.node');
                setLocal(Object.assign(revisePost(post), { loading: false }));
                highlightCodeBlock();
            });
        }
    }, [ state, unique ]);
    const { loading, title, content } = local;
    if(loading) {
        return (
            <Loading message="数据加载中……" />
        );
    }
    document.title = `${title} - 博客 - ${process.env.REACT_APP_TITLE || ''}`;
    return (
        <article className="post">
            <h2>{ title || '' }</h2>
            <section className="mark">
                <div className="content">
                    <Markdown children={ content || '' } options= { markdownOptions }/>
                </div>
            </section>
        </article>
    );
};

export default Post;