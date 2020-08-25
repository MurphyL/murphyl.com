import React, { Fragment, useEffect, useState } from 'react';

import { Link, useParams } from "react-router-dom";

import Markdown from 'markdown-to-jsx';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import { Loading } from '../../../core/loading/loading';

import { fetched } from '../../../utils/murph_store';

import './blog_post.css';

const LANG_TYPES = {
    'lang-sh': 'Shell',
    'lang-awk': 'Awk',
    'lang-lua': 'Lua',
    'lang-java': 'Java',
    'lang-bash': 'Bash',
    'lang-shell': 'Shell',
    'lang-js': 'JavaScript',
    'lang-javascript': 'JavaScript',
    'lang-dockerfile': 'Dockerfile'
};

const Title = ({ type, children }) => {
    return React.createElement(type, { className: 'title', string: type.toUpperCase() }, <span>{ children }</span>);
}

const H3 = (props) => (<Title type='h3' { ...props } />);
const H4 = (props) => (<Title type='h4' { ...props } />);
const H5 = (props) => (<Title type='h5' { ...props } />);
const H6 = (props) => (<Title type='h6' { ...props } />);

const Prepare = ({ children }) => {
    if(children && children.type === 'code') {
        const langType = LANG_TYPES[children.props.className] || 'Text';
        return (
            <div className="code-block">
                <pre>{ children }</pre>
                <div className="lang-type">{ langType }</div>
            </div>
        )
    }
    return (
        <div>TODO prepare block</div>
    );
};

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
            component: H4
        },
        h5: {
            component: H5
        },
        h6: {
            component: H6
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
    }
};

const highlightCodeBlock = () => {
    hljs.configure({
        tabReplace: '    ',
    });
    hljs.initHighlighting();
    document.querySelectorAll('.code-block code').forEach((block) => {
        hljs.highlightBlock(block);
    });    
};

const Post = () => {
    const { unique } = useParams();
    const [ local, setLocal ] = useState({ status: -1 });
    useEffect(() => {
        fetched.then(fetched => {
            const post = fetched.get('blog').find({ filename: unique }).value();
            const author = fetched.get('author').find({ id: post.author }).value();
            setLocal({ post, author, status: 0 });
            setTimeout(() => {
                highlightCodeBlock();
            }, 50);
        })
    }, [ unique ]);
    const { status, post, author } = local;
    if(status > 0) {
        return (
            <div><b>{ status }</b> - 找不到指定的文章</div>
        );
    } else if(status < 0) {
        return (
            <Loading />
        );
    }
    return (
        <Fragment>
            <article className="post">
                <h2>{ post.title || '' }</h2>
                <section>
                    <Markdown children={ post.markdown || '' } options= { markdownOptions }/>
                </section>
                <section className="author">
                    <div className="details">
                        <h3><Link to={ `/author/${author.id}` }>{ author.name || '' }</Link></h3>
                        <div>{ author.desc || '' }</div>
                        <div className="social">
                            <Link to={ `/author/${author.id}` }>
                                <span className="social-link">查看Ta的专栏</span>
                            </Link>
                            { (author.social || []).map((item, index) => (
                                <a key={ index } href={ item.link } target="_blank" rel="noopener noreferrer">
                                    <span className={ `social-link social-link-${item.type}` }>{ item.type }</span>
                                </a>
                            )) }
                        </div>
                    </div>
                </section>
            </article>
        </Fragment>
    );
};

export default Post;