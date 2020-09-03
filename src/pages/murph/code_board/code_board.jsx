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

export class CodeSnippet extends Component {
	
	componentDidMount() {
		setTimeout(() => {
			highlightCodeBlock();
		}, 200);
	}

	render() {
		const { title, content, children } = this.props;
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
	}
		
};

class CodeBoard extends Component {

	state = {
		loading: true
	}


	componentDidMount() {
		const { state } = this.props.location;
		if(state) {
			console.log('初始化：', state);
			this.setCodeDetails(state);
		} else {
			const { unique } = this.props.match.params || {};
			this.fetchCodeDetails(unique);	
		}
	}

	fetchCodeDetails(unique) {
		executeGraphQl('get_code_issue_detail', { id: unique }).then(resp => {
			const { id, body, issue } = lodashGet(resp, 'data.node') || {};
			this.setCodeDetails({ id, body, issue });
		});
	}

	navi(direction) {
		const { id, issue } = this.state;
		executeGraphQl('fetch_issue_commits', {
			issueId: issue.id,
		}).then(resp => {
			const comments = lodashGet(resp, 'data.node.comments.nodes') || [];
			const fixed = direction ? -1 : 1;
			const [ comment ] = comments.filter((item, index) => {
				return (comments[index + fixed] || {}).id === id;
			});
			if(comment) {
				console.log('下一个片段：', comment);
				this.props.history.push({
					pathname: `/code/board/${comment.id}`, 
					state: Object.assign(comment, { issue })
				});
			} else {
				console.log('未发现');
				this.setState({ lost: true });
			}
		});
	}

	setCodeDetails(comment) {
		if(!comment) {
			return this.setState({ lost: true });
		}
		const { id, body, ...other } = comment;
		const { content, data } = matter(body, matterConfig);
		this.setState({ loading: false, ...data, id, content, ...other });
	}

	render() {
		const { loading, lost } = this.state;
		if(loading) {
			return (
				<Loading />
			);
		}
		if(lost) {
			return (
				<div>NOT_FOUND</div>
			);
		}
		const { title, content } = this.state;
		return (
			<CodeSnippet title={ title } content={ content }>
				{/*
				<span className="action disabled" onClick={ () => this.navi.bind(this)(1) }>下一个</span>
				<span className="action disabled" onClick={ () => this.navi.bind(this)(0) }>上一个</span>
				*/}
				<Link className="action" to="/code/snippets">查看更多</Link>
			</CodeSnippet>
		);		
	}

};

export default withRouter(CodeBoard);