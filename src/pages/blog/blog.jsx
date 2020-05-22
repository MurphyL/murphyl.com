import React, { Fragment, useState, useEffect } from 'react';

import Markdown from 'markdown-to-jsx';

import { ajaxGet } from '../../utils/rest_client';

import { Loading } from '../../core/loading/loading.jsx';

import './blog.css';

const extractSummary = (text) => {
    return (text || '').split(/<!(-{2,})( *)more( *)(-{2,})>/)[0];
};

function BlogPost({ post }) {
    return (
        <Fragment>
            <dt>
                <a href={`/post/${post.filename}`}>
                    <h2>{post.meta.title}</h2>
                </a>
            </dt>
            <dd>
                <article className="summary">
                    <Markdown children={ extractSummary(post.markdown) } options={{
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
    const [ local, cacheUpdate ] = useState({ status: -1 });
    useEffect(() => {
        ajaxGet('posts.json').then(({ status, payload }) => {
            const { mapping, blog } = payload || {};
            const posts = (blog || []).map(i => (mapping[i] || {}));
            cacheUpdate({ status, posts });
        });
    }, [ ]);
    if (local.status === -1) {
        return (
            <Loading />
        )
    } else if (local.status === 0) {
        return (
            <dl>{
                (local.posts || []).map((post, index) => {
                    return (
                        <BlogPost key={index} post={post} summary={true} />
                    )
                })}
            </dl>
        )
    } else {
        return <div>error</div>
    }
};

export default BlogList;