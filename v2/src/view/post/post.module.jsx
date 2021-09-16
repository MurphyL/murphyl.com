import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import * as matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';

import { Loading } from 'plug/include/status/status.module';

import NavLayout from 'plug/layout/nav_layout/nav_layout.module.jsx';

import './post.module.css';

const Title = ({ type, children }) => {
    return React.createElement(type, { className: 'title' }, children);
}

const H3 = (props) => (<Title type='h3' { ...props } />);

const Paragraph = ({ children }) => {
    if(children && Array.isArray(children)) {
        if(children[0] && children[0].type === 'img') {
            return (
                <p className="image">{ children }</p>
            )
        }
    }
    return (
        <p className="paragraph">{ children }</p>
    );
};

const FlexImage = ({ items, alt }) => {
    return (
        <div className="flex-wrapper">
            { (JSON.parse(items) || []).map((item, index) => (
                <div className="flex-item image" key={ index }>
                    <img src={ item } alt={ alt || ''} />
                </div>
            )) }
        </div>
    );
};

const Prepare = ({ children }) => {
    return (
        <div className="prepare">{ children }</div>
    );
};

const markdownOptions = {
    overrides: {
        h1: {
            component: H3
        },
        h2: {
            component: H3
        },
        h3: {
            component: H3
        },
        h4: {
            component:  (props) => (<Title type='h4' { ...props } />)
        },
        h5: {
            component:  (props) => (<Title type='h5' { ...props } />)
        },
        h6: {
            component:  (props) => (<Title type='h6' { ...props } />)
        },
        p: {
            component: Paragraph
        },
        pre: {
            component: Prepare
        },
        div: {
            props: {
                className: 'content'
            }
        },
        table: {
            props: {
                className: 'm10',
                border: 1,
                cellSpacing: 0,
                cellPadding: 0,
            }
        },
        FlexImage: {
            component: FlexImage
        }
    }
};

export default function Post() {
    const { unique } = useParams();
    const [ code, setCode ] = useState(-1);
    const [ post, setPost ] = useState('');
    useEffect(() => {
        axios.get(`/markdown/${unique}`).then(({ status, data }) => {
            setCode(status);
            setPost(data);
        })
    }, [ unique ]);
    if(code < 0) {
        return (
            <NavLayout>
                <Loading />
            </NavLayout>
        );
    }
    if(code !== 200 || post === '') {
        return (
            <div>数据加载错误…</div>
        );
    }
    const { data: meta, content } = matter(post);
    return (
        <NavLayout>
            <article>
                <h2>{ meta.title || unique }</h2>
                <section>
                    <Markdown children={ content || '' } options= { markdownOptions }/>
                </section>
            </article>
        </NavLayout>
    );
};