import React, { useEffect, useState } from 'react';

import { useParams, useLocation } from "react-router-dom";

import lodashGet from 'lodash/get';

import Markdown from 'markdown-to-jsx';

import { Loading } from '../../../core/loading/loading';

import { getBlogDetails } from '../../../utils/murph_store';

import { revisePost } from '../../../utils/article_utils';

import { markdownOptions, highlightCodeBlock } from 'includes/mark_config.jsx';

import './blog_post.css';

const Post = () => {
    const { unique } = useParams();
    const { state } = useLocation();
    const [ local, setLocal ] = useState({ loading: true });
    useEffect(() => {
        if(state) {
            setLocal(Object.assign(state, { loading: false }));
            highlightCodeBlock();
        } else {
            getBlogDetails(unique).then((resp) => {
                console.log(resp);
                const post = lodashGet(resp, 'data.node');
                setLocal(Object.assign(revisePost(post), { loading: false }));
                highlightCodeBlock();
            });
        }
    }, [ state, unique ]);
    const { loading, title, content } = local;
    if(loading) {
        return (
            <Loading message="数据加载中……" />
        );
    }
    return (
        <article className="post">
            <h2>{ title || '' }</h2>
            <section className="mark">
                <div className="content">
                    <Markdown children={ content || '' } options= { markdownOptions }/>
                </div>
            </section>
            {/*<section className="author">
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
            </section>*/}
        </article>
    );
    /*const { unique } = useParams();
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
    );*/
};

export default Post;