import React, { Component, Fragment } from 'react';

import Markdown from 'react-markdown';

import  FileUtils from '../../utils/FileUtils';
import  BlogUtils from '../../utils/BlogUtils';

// 获取数据
export async function getStaticProps() {
	return {
		props: {
			posts: FileUtils.listBlog(true),
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
				<dt><a href={ `/blog/${post.filename}` }>{ meta.title }</a></dt>
				<dd>
					<div>
						<div>{ meta.author }</div>
						<Markdown escapeHtml={ false } source={ content } />
					 </div>
				</dd>
			</Fragment>
		)
	}

}

export default function BlogList({ posts }) {
	return (
		<dl>{ posts.map((post, index) => <BlogPost key={ index } post={ post } summary={ true } /> ) }</dl>
	)
}