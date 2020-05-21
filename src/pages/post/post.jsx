import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Markdown from 'markdown-to-jsx';

import { getByUnique } from '../../utils/blog_utils';

import { Loading } from '../../core/loading/loading.jsx';

import './post.css';

function Post() {
    const { unique } = useParams();
    const [ post, setPost ] = useState({ code: -1 });
    useEffect(() => {
        getByUnique(unique).then(res => {
            setPost(res);
        });
    }, [ unique ]);
    if(post.code === -1) {
        return (
            <Loading />
        );
    }
    if(post.code === 1){
        return (
            <div>error</div>
        );
    }
    return (
        <article className="content">
            <h2>{post.meta.title}</h2>
            <Markdown children={post.markdown}
                options={{
                    slugify: str => str,
                    createElement: (type, props, children) => {
                        if (props.key === 'outer') {
                            props.className = 'outer markdown';
                        }
                        if (children && children.length === 1 && Array.isArray(children)) {
                            let first = children[0];
                            if (first) {
                                if (first.type === 'img') {
                                    props.className = 'image';    
                                }                                        
                            }
                        } else {
                            // console.log(type, props, children);
                        }
                        if(type === 'code'){
                            props.className = 'code'
                        }
                        if (type === 'pre' && children && children.type === 'code') {
                            props.className = 'code-block'
                        }
                        return React.createElement(type, props, children);
                    },
                }} />
        </article>
    );
};

export default Post;