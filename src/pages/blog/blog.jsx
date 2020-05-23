import React, { Fragment } from 'react';

import Markdown from 'markdown-to-jsx';

import './blog.css';

const extractSummary = (text) => {
    return (text || '').split(/<!(-{2,})( *)more( *)(-{2,})>/)[0];
};

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


function BlogList({ blog = [], dict = {} }) {
    const posts = blog.map(item => (dict[item] || {}));
    return (
        <dl>{
            (posts || []).map((post, index) => (
                <BlogPost key={index} post={post} summary={true} />
            ))}
        </dl>
    )
};

export default BlogList;