import React, { Component, Fragment } from 'react';

import Markdown from 'markdown-to-jsx';

import axios from 'axios';

import { Loading } from '../../core/loading/loading.jsx';

import './blog.css';

const extractSummary = (text) => {
    return (text || '').split(/<!(-{2,})( *)more( *)(-{2,})>/)[0];
};

class BlogPost extends Component {

    render() {
        const { post } = this.props;
        return (
            <Fragment>
                <dt>
                    <a href={`/post/${post.filename}`}>
                        <h2>{post.meta.title}</h2>
                    </a>
                </dt>
                <dd>
                    <article className="summary">
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

}


class BlogList extends Component {

    state = {
        status: -1
    }

    componentDidMount() {
        axios.get(`${process.env.PUBLIC_URL}/blog.json`)
            .then(({ status, data }) => {
                // console.log(statusText, status);
                if (status === 200) {
                    this.setState({
                        status: 0,
                        items: data
                    })
                } else {
                    this.setState({
                        status: 1,
                    })
                }
            })
            .catch(({ response }) => {
                console.log(response);
                this.setState({
                    status: 1,
                    code: response.status
                })
            })
    }

    render() {
        const posts = this.state.items || [];
        const status = this.state.status;
        if (status === -1) {
            return (
                <Loading />
            )
        } else if (status === 0) {
            return (
                <dl>{
                    posts.map((post, index) => {
                        return (
                            <BlogPost key={index} post={post} summary={true} />
                        )
                    })}
                </dl>
            )
        } else {
            return <div>error</div>
        }
    }
}

export default BlogList;