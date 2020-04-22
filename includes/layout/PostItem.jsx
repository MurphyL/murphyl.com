// import Markdown from 'react-markdown';
import Markdown from 'markdown-to-jsx';

import React, { Component } from 'react';

export default class PostItem extends Component {

	render() {
		const CodeBlock = <div></div>
		return (
			<article className="markdown">
				<h2>{ this.props.meta.title }</h2>
				<Markdown children={ this.props.markdown } 
					options={{
						slugify: str => str,
			            createElement: (type, props, children) => {
			            	if(props.key === 'outer') {
			            		props.className = 'outer post';
			            	}
			            	if(type === 'pre' && children.type === 'code') {
								props.className = 'code-block'
			            	}
			                return React.createElement(type, props, children);
			            },
	    			}} />
			</article>
		)
	}
}