import React, { Fragment, useEffect, useState } from 'react';

import { connect } from 'react-redux';

import Markdown from 'markdown-to-jsx';

import { Link } from "react-router-dom";

import { Loading } from 'core/loading/loading';

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
}


const BlogList = ({ blogAction, dispatch }) => {
    const [ state, setState ] = useState({ code: -1 });
    useEffect(() => {
        dispatch({ type: 'FETCH_POSTS' });
    }, [ dispatch ]);
    useEffect(() => {
        blogAction.then(items => {
            setState({ code: 0, items });
        });
    }, [ blogAction ]);
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
        <dl className="blog">
            {(state.items || []).filter(({ hidden = false }) => {
                return !hidden;
            }).map((post, index) => {
                return (
                    <BlogPost key={index} post={post} />
                )
            })}
        </dl>
    )
};

const mapStateToProps = ({ blogAction }, ownProps) => {
    return {
        blogAction
    };
};

export default connect(mapStateToProps)(BlogList);