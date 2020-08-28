import React, { Fragment, useEffect, useState } from 'react';

import lodashGet from 'lodash/get';

import { Link } from "react-router-dom";

import Markdown from 'markdown-to-jsx';

import { Loading } from '../../../core/loading/loading';

import { revisePost } from '../../../utils/article_utils';

import { fetchBlogItems } from '../../../utils/murph_store';


import './blog_list.css';

const BlogPost = ({ post }) => {
    const { title, id } = post;
    const parsed = revisePost(post);
    const linkInfo = {
        pathname: `/post/${id || 'x'}`, 
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

export const BlogPager = ({ pageInfo }) => {
    const { hasNextPage, hasPreviousPage } = pageInfo;
    return (
        <div>
            <div>{ hasPreviousPage && ( <span>上一页</span> ) }</div>
            <div>{ hasNextPage && ( <span>下一页</span> ) }</div>
        </div>
    );
};

export const BlogItems = ({ posts }) => {
    return (
        <dl className="blog">
            {(posts || []).map((post, index) => {
                return (
                    <BlogPost key={ index } post={ post } />
                )
            })}
        </dl>
    );
};


const GITHUB_ISSUES_PATH = 'data.repository.issues';

const BlogList = () => {
    const [ local, setLocal ] = useState({ loading: true });
    useEffect(() => {
        fetchBlogItems().then((resp) => {
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
    }, []);
    const { loading, posts, pageInfo } = local;
    if(loading) {
        return (
            <Loading message="数据加载中……" />
        );
    }
    return (
        <Fragment>
            <BlogItems posts={ posts } />
            <BlogPager pageInfo = { pageInfo } />
        </Fragment>
    );
}

export default BlogList;
