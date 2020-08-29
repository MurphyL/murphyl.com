import React, { Fragment, useEffect, useState } from 'react';

import lodashGet from 'lodash/get';

import { Link, useLocation } from "react-router-dom";

import Markdown from 'markdown-to-jsx';

import { Loading } from '../../../core/loading/loading';

import { revisePost } from '../../../utils/article_utils';

import { fetchBlogItems } from '../../../utils/murph_store';


import './blog_list.css';

const BlogPost = ({ post }) => {
    const { title, id } = post;
    const parsed = revisePost(post);
    const linkInfo = {
        pathname: `/post/${id || 'NOT_FOUND'}`, 
        state: revisePost(post)
    };
    return (
        <Fragment>
            <dt>
                <Link to={ linkInfo }>
                    <h2>{ title }</h2>
                </Link>
            </dt>
            <dd>
                <article className="summary">
                    <Markdown children={ parsed.excerpt } options={{
                        createElement: (type, props, children) => {
                            if (props.key === 'outer') {
                                props.className = 'outer markdown';
                            }
                            return React.createElement(type, props, children);
                        },
                    }} />
                </article>
            </dd>
        </Fragment>
    )
};

const revieNavi = (state) => {
    return {
        state, pathname: '/blog'
     };
};

export const BlogPager = ({ pageInfo, fromPrev }) => {
    const { hasNextPage, hasPreviousPage, endCursor, startCursor } = pageInfo;
    return (
        <div>
            <div>{ hasPreviousPage && (
                 <Link to={revieNavi({
                    source: 'pager',
                    direction: 'before',
                    cursor: startCursor
                })}>上一页</Link> 
            ) }</div>
            <div>{ (hasNextPage || fromPrev) && (
                <Link to={revieNavi({
                    direction: 'after',
                    cursor: endCursor
                })}>下一页</Link> 
            ) }</div>
        </div>
    );
};

export const BlogItems = ({ posts }) => {
    return (
        <dl className="blog">
            {(posts || []).map((post, index) => (
                <BlogPost key={ index } post={ post } />
            ))}
        </dl>
    );
};


const GITHUB_ISSUES_PATH = 'data.repository.issues';

const BlogList = () => {
    const { state } = useLocation();
    const [ local, setLocal ] = useState({ loading: true });
    useEffect(() => {
        setLocal({ loading: true });
        const params = state ? state : { 
            cursor: null,
            direction: 'before', 
        };
        fetchBlogItems({
            ...params,
            size: 5,
            type: 'X-POST'
        }).then((resp) => {
            const { nodes, pageInfo, totalCount } = lodashGet(resp, GITHUB_ISSUES_PATH);
            setLocal({
                loading: false,
                pageInfo, 
                totalCount,
                posts: nodes
            });
        }).catch(error => {
            console.log('查询数据出错：', error);
        })
    }, [ state ]);
    const { loading, posts, pageInfo } = local;
    if(loading) {
        return (
            <Loading message="数据加载中" />
        );
    }
    const fromPrev = state && (state.source === 'pager');
    return (
        <Fragment>
            <BlogItems posts={ posts } />
            <BlogPager pageInfo = { pageInfo } fromPrev = { fromPrev } />
        </Fragment>
    );
}

export default BlogList;
