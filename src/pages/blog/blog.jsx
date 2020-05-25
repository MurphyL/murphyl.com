import React, { Fragment, useEffect, useState } from 'react';

import Markdown from 'markdown-to-jsx';

import { ajaxGet } from 'utils/rest_client';

import './blog.css';

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
    return (
        <dl>
            {(state.payload || []).map((post, index) => (
                <BlogPost key={index} post={post} />
            ))}
        </dl>
    )
};

export default BlogList;