import React, { Fragment, useEffect, useState } from 'react';

import Markdown from 'markdown-to-jsx';

import { Link } from "react-router-dom";

import blogStore from '../../../utils/murph_store';

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


const BlogList = () => {
    const [ posts, setPosts ] = useState([]);
    useEffect(() => {
        blogStore.then((fetched) => {
            setPosts(fetched.filter({ release: true }).take(10).value());
        });
    }, [])
    return (
        <dl className="blog">
            {(posts || []).map((post, index) => {
                return (
                    <BlogPost key={index} post={post} />
                )
            })}
        </dl>
    )
};

export default BlogList;