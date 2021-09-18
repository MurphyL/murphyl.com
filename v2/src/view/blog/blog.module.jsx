import React, { Fragment } from 'react';

import Markdown from 'markdown-to-jsx';

import SiteLayout from 'plug/layout/site-layout/site-layout.module.jsx';

import './blog.module.css';

export function BlogPost({ post }) {
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


export default function BlogList() {
    return (
        <SiteLayout>
            Blog
        </SiteLayout>
    )
};
