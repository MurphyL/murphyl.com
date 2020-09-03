import React, { Component } from 'react';

import { Link, withRouter } from "react-router-dom";

import * as matter from 'gray-matter';

import lodashGet from 'lodash/get';

import Markdown from 'markdown-to-jsx';

import { Loading } from 'core/loading/loading';

import { executeGraphQl } from 'utils/murph_store';

import { markdownOptions, highlightCodeBlock } from 'includes/mark_config.jsx';


import './code_board.css';

const matterConfig = { 
    excerpt: true, 
    delims: '```',
};

export const CodeSnippet = ({ title, content, children }) => {
	return (
		<div id="code-board">
			<div className="meta">
				<div className="title">
					<span>{ title || '' }</span>
				</div>
				<div className="extra">
					{ children }
				</div>
			</div>
			<div className="mark">
				<div className="content">
					<Markdown children={ content || '' } options= { markdownOptions } />
				</div>
			</div>
		</div>
	);		
};

class CodeBoard extends Component {

	state = {
		loading: true
	}

	componentDidMount() {
		this.getCodeDetails();
	}

	getCodeDetails() {
		const { unique } = this.props.match.params || {};
		executeGraphQl('get_code_issue_detail', { id: unique }).then(resp => {
			const { body, ...meta } = lodashGet(resp, 'data.node') || {};
			const { content, data } = matter(body, matterConfig);
			this.setState({ loading: false, ...data, ...meta, content });
			setTimeout(() => {
				highlightCodeBlock();
			}, 100);
		});
	}

	render() {
		const { loading } = this.state;
		if(loading) {
			return (
				<Loading />
			);
		}
		const { title, content } = this.state;
		return (
			<CodeSnippet title={ title } content={ content }>
				<div className="message">
					<Link to="/code/snippets">查看更多……</Link>
				</div>
			</CodeSnippet>
		);		
	}

};

export default withRouter(CodeBoard);