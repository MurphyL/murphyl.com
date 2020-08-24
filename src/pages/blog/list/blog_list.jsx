import React, { Fragment, useEffect, useState } from 'react';

import { Link, useLocation } from "react-router-dom";

import Markdown from 'markdown-to-jsx';

import { Loading } from '../../../core/loading/loading';

import { blogFetched } from '../../../utils/murph_store';

import './blog_list.css';

const BlogPost = ({ post }) => {
    return (
        <Fragment>
            <dt>
                <Link to={ `/post/${post.filename}` }>
                    <h2>{ post.title }</h2>
                </Link>
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
};

export const BlogPager = ({ more, count }) => {
    if(!more) {
        return (
            <div>已加载全部<b>{ count }</b>篇文章</div>
        );
    }
    return (
        <div>查看更多（共有<b>{ count }</b>篇文章）</div>
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

const BlogList = () => {
    const { search } = useLocation();
    const [ local, setLocal ] = useState({ loading: true });
    const [ pageNum, setPageNum ] = useState(1);
    useEffect(() => {
        const params = {};
        const entries = new URLSearchParams(search).entries();
        for(let [ key, val ] of entries) {
            params[key] = val;
        }
        blogFetched.then((fetched) => {
            const { ps = 5 } = params;
            const temp = fetched.filter({ release: true });
            const count = temp.size().value();
            const more = (pageNum * ps) < count;
            setLocal({
                more,
                loading: false,
                totalSize: count,
                posts: temp.take(pageNum * ps).value(),
            });
        });
    }, [ search, pageNum ]);
    const { loading, posts, more, totalSize } = local;
    if(loading) {
        return (
            <Loading />
        );
    };
    const changePage = (e) => {
        if(!more) {
            return;
        }
        setPageNum(pageNum + 1);
    };
    console.log(local);
    return (
        <Fragment>
            <BlogItems posts={ posts } />
            <div className="pager" onClick={ changePage }>
                <BlogPager more={ more } count={ totalSize } />
            </div>
        </Fragment>
    );
};

export default BlogList;
