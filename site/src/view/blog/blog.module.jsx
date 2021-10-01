import React, { Fragment, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import { get as pathGet } from 'object-path';
import Markdown from 'markdown-to-jsx';
import { Loading } from 'plug/include/status/status.module.jsx';
import SiteLayout from "plug/template/site-layout/site-layout.module.jsx";

import { fetchGraphQlMapper, callGithubAPI } from 'plug/extra/rest_utils.jsx';

import styles from './blog.module.css';


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


function BlogList() {
    const graphql = useRecoilValue(fetchGraphQlMapper());
    const fetched = useRecoilValue(callGithubAPI({
        graphql: pathGet(graphql, ['query-blog-issues', '_cdata']),
        tags: (process.env.REACT_APP_GHP_BLOG_TAG || '').split(','),
    }));
    const issues = pathGet(fetched, 'data.repository.issues');
    console.log('blog issues', issues);
    return (
        <Fragment>
            <Helmet>
                <title>博客 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>Blog</div>
        </Fragment>
    );
};

export default function Blog() {
    return (
        <SiteLayout>
            <Suspense fallback={<Loading />}>
                <BlogList />
            </Suspense>
        </SiteLayout>
    );
}
