import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import lodashGet from 'lodash/get';

import Markdown from 'markdown-to-jsx';

import { Loading } from 'core/loading/loading';

import { executeGraphQl } from 'utils/murph_store';

import { revisePost } from 'utils/article_utils';

import { markdownOptions, highlightCodeBlock } from 'includes/mark_config.jsx';

import './blog_post.css';

class PostX extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        const { state } = this.props.location;
        if(state) {
            this.setPostDetail(state);
        } else {
            const { number } = this.props.match.params;
            executeGraphQl('get_issue_detail', {
                owner: 'MurphyL',
                repo: 'murphyl.com',
                number: parseInt(number)
            }).then(resp => {
                const post = lodashGet(resp, 'data.repository.issue');
                this.setPostDetail(revisePost(post));
            });
        }
    }

    setPostDetail(post) {
        this.setState(Object.assign(post, { 
            loading: false 
        }));
        highlightCodeBlock();
    }

    render() {
        const { loading, title, content } = this.state;
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
            </article>
        );
    }

};

export default withRouter(PostX);