import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import { BackTop } from 'antd';

import lodashGet from 'lodash/get';

import Markdown from 'markdown-to-jsx';

import { Loading } from 'core/loading/loading';

import { executeGraphQl } from 'utils/murph_store';

import { revisePost } from 'utils/article_utils';

import IssueReactions from 'includes/issue_reactions/issue_reactions.jsx';

import { markdownOptions, highlightCodeBlock } from 'includes/mark_config.jsx';

import './blog_post.css';

const ISSUE_PATH = 'data.repository.issue';

class Post extends Component {

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
                number: parseInt(number)
            }).then(resp => {
                const { reactionGroups, ...post } = lodashGet(resp, ISSUE_PATH);
                this.setPostDetail(Object.assign(revisePost(post), { reactionGroups }));
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
        const { loading } = this.state;
        if(loading) {
            return (
                <Loading message="数据加载中……" />
            );
        }
        const { title, content, reactionGroups } = this.state;
        return (
            <article id="blog-post">
                <div className="top">
                    <h2>{ title || '' }</h2>
                    <div className="reaction">
                        <IssueReactions group={ reactionGroups } />
                    </div>
                </div>
                <section className="mark">
                    <div className="content">
                        <Markdown children={ content || '' } options= { markdownOptions }/>
                    </div>
                </section>
                <BackTop>
                    <b>UP</b>
                </BackTop>
            </article>
        );
    }

};

export default withRouter(Post);