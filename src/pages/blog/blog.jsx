import React, { Component, Fragment } from 'react';

import Markdown from 'markdown-to-jsx';

import axios from 'axios';

class BlogPost extends Component {

	render() {
		const { post } = this.props;
		return (
			<Fragment>
				<dt>
					<a href={ `/post/${post.filename}` }>
						<h2>{ post.meta.title }</h2>
					</a>
				</dt>
				<dd>
					<article className="summary">
						<Markdown children={ post.summary } options={{
				            createElement: (type, props, children) => {
				            	if(props.key === 'outer') {
				            		props.className = 'outer summary';
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
            .then(({ statusText, status, data }) => {
                console.log(statusText, status);
                if (statusText === 'OK') {
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
            .catch(error => {
                this.setState({
                    status: 1,
                })
            })
    }

    render() {
        const posts = this.state.items || [];
        const status = this.state.status;
        if (status === -1) {
            return <div>loading</div>
        } else if (status === 0) {
            return <dl className="blog">{ posts.map((post, index) => <BlogPost key={ index } post={ post } summary={ true } /> ) }</dl>
        } else {
            return <div>error</div>
        }
    }
}

export default BlogList;