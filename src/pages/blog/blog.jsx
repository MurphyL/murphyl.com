import React, { Fragment, useEffect, useState } from 'react';

import { connect } from 'react-redux';

import Markdown from 'markdown-to-jsx';

import { Loading } from 'core/loading/loading';

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


function BlogList({ blogFetched, dispatch }) {
    const [ state, setState ] = useState({ code: -1 });
    useEffect(() => {
        dispatch({ type: 'FETCH_POSTS' });
    }, [ dispatch ]);
    useEffect(() => {
        blogFetched.then(items => {
            setState({ code: 0, items });
        })
    }, [ blogFetched ]);
    if(state.code === -1) {
        return (
            <Loading message="正在加载博客数据……" />
        );
    } else if(state.code === 1) {
        return (
            <div>加载文章列表出错~</div>
        )
    }
    return (
        <dl>
            {(state.items || []).filter(({ meta = {} }) => {
                return !meta.hidden;
            }).map((post, index) => {
                return (
                    <BlogPost key={index} post={post} />
                )
            })}
        </dl>
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        blogFetched: state.blogAction
    };
}

export default connect(mapStateToProps)(BlogList);