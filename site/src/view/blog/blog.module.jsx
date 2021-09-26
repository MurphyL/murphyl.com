import React from 'react';
import { Helmet } from 'react-helmet-async';
import Markdown from 'markdown-to-jsx';

import SiteLayout from "plug/template/site-layout/site-layout.module.jsx";

import './blog.module.css';

export function BlogPost({ post }) {
    return (
        <SiteLayout>
            <Helmet>
                <title>{post.title} - 博客 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <dt>
                <a href={`/post/${post.filename}`}>
                    <h2>{post.title}</h2>
                </a>
            </dt>
            <dd>
                <article className={`summary ${post.kind}`}>
                    <Markdown children={post.summary} options={{
                        createElement: (type, props, children) => {
                            if (props.key === 'outer') {
                                props.className = 'outer markdown';
                            }
                            return React.createElement(type, props, children);
                        },
                    }} />
                </article>
            </dd>
        </SiteLayout>
    );
};


export default function BlogList() {
    return (
        <SiteLayout>
            <Helmet>
                <title>博客 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div>Blog</div>
        </SiteLayout>
    );
};
