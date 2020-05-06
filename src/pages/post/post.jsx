import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Markdown from 'markdown-to-jsx';

import axios from 'axios';

import { Loading } from '../../core/loading/loading.jsx';

import './post.css';

class Post extends Component {

    state = {
        status: -1
    }

    componentDidMount() {
        const { params } = this.props.match || {};
        // params.unique
        axios.get(`${process.env.PUBLIC_URL}/blog.json`)
            .then(({ status, data }) => {
                if (status === 200 && data && Array.isArray(data)) {
                    const post = data.find(({ filename }) => {
                        return filename === params.unique;
                    })
                    if(!post) {
                        throw new Error('NOT FOUND');
                    }
                    this.setState({
                        status: 0, post
                    })
                } else {
                    this.setState({
                        status: 1,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    status: 1,
                })
            })
    }

    render() {
        const status = this.state.status;
        if (status === -1) {
            return (
                <Loading />
            )
        } else if (status === 0) {
            return (
                <article className="content">
                    <h2>{this.state.post.meta.title}</h2>
                    <Markdown children={this.state.post.markdown}
                        options={{
                            slugify: str => str,
                            createElement: (type, props, children) => {
                                if (props.key === 'outer') {
                                    props.className = 'outer markdown';
                                }
                                if (type === 'pre' && children.type === 'code') {
                                    props.className = 'code-block'
                                }
                                return React.createElement(type, props, children);
                            },
                        }} />
                </article>
            )
        } else {
            return <div>error</div>
        }
    }
}

export default withRouter(Post);