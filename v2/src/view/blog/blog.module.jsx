import React, { Fragment, useEffect, useState } from 'react';

import Markdown from 'markdown-to-jsx';

import { Error, Loading } from 'plug/include/status/status.module.jsx';

import NavLayout from 'plug/layout/nav_layout/nav_layout.module.jsx';

import { ajaxGet } from 'utils/rest_client';

import './blog.module.css';

function BlogPost({ post }) {
    return (
        <Fragment>
            <dt>
                <a href={ `/post/${post.filename}` }>
                    <h2>{ post.title }</h2>
                </a>
            </dt>
            <dd>
                <article className={ `summary ${post.kind}` }>
                    <Markdown children={ post.summary } options={{
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
}


function BlogList() {
    const [ state, setState ] = useState({ code: -1 });
    useEffect(() => {
        ajaxGet('blog.json').then(setState);
    }, []);
    if(state.code === -1) {
        return (
            <Loading message="正在加载博客数据……" />
        );
    } else if(state.code === 1) {
        return (
            <NavLayout>
                <Error message="加载文章列表出错~" />
            </NavLayout>
        )
    }
    return (
        <NavLayout>
            <dl>
                {(state.payload || []).map((post, index) => (
                    <BlogPost key={index} post={post} />
                ))}
            </dl>
        </NavLayout>
    )
};

export default BlogList;