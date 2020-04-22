import React, { Component, Fragment } from 'react';

// import Markdown from 'react-markdown';
import Markdown from 'markdown-to-jsx';

import  FileUtils from '../../utils/FileUtils';
import  BlogUtils from '../../utils/BlogUtils';

// 获取数据
export async function getStaticProps() {
	return {
		props: {
			title: '博客',
			posts: FileUtils.listBlog(true).sort((a, b) => {
				return -a.filename.localeCompare(b.filename)
			}),
		}
	}
}

class BlogPost extends Component {

	constructor (props) {
		super();
		const source = (props.post || {}).source || '';
		this.state = BlogUtils.reslovePostMeta(source);
	}

	render() {
		const { post, summary = false } = this.props;
		const { meta, markdown } = this.state;
		const content = summary ? BlogUtils.extractSummary(markdown) : markdown;
		return (
			<Fragment>
				<dt>
					<a href={ `/blog/${post.filename}` }>
						<h2>{ meta.title }</h2>
					</a>
				</dt>
				<dd>
					<article className="summary">
						{/** <div>{ meta.author }</div> **/}
						<Markdown children={ content }
							options={{
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

export default class BlogList extends Component {

	render() {
		const { posts } = this.props;
		return (
			<dl className="blog">{ (posts || []).map((post, index) => <BlogPost key={ index } post={ post } summary={ true } /> ) }</dl>
		)
	}
	
}