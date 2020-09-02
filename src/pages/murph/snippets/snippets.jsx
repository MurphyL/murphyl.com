import React, { Component, Fragment } from 'react';

import { Link, withRouter } from "react-router-dom";

import * as matter from 'gray-matter';

import Markdown from 'markdown-to-jsx';

import lodashGet from 'lodash/get';

import { Icon } from '../../../utils/murph_icon.jsx';

import { Loading } from '../../../core/loading/loading';
import { fetchCodeItems } from '../../../utils/murph_store';

import { markdownOptions, highlightCodeBlock } from '../../../utils/mark_config.jsx';

import './snippets.css';

const matterConfig = { 
    excerpt: true, 
    delims: '```',
};

const MAX = 999999;

class Snippets extends Component {

	state = { loading: true };

	componentDidMount() {
		const { params = {} } = this.props.match || {};
		if(params.unique) {
			console.log(params);
		} else {
			this.fetchItems();	
		}
	}

	fetchItems() {
		fetchCodeItems({ size: 30 }).then(resp => {
			const items = (lodashGet(resp, 'data.repository.issues.nodes') || []).map(item => {
			    const parsed = matter(item.body, matterConfig);
			    const { id, title, url, comments } = item;
			    const snippets = (comments.nodes || []).map(code => {
			    	const temp = matter(code.body, matterConfig);
			    	return { ...temp.data, content: temp.content };
			    });
			    const { content, data } = parsed;
				return Object.assign((data || {}), { 
					id, title, url, content, snippets
				});
			});
			this.setState({ 
				items, 
				cateIndex: 0, 
				codeIndex: 0, 
				loading: false 
			});
		});
	}

	showTags() {
		const { items = [], cateIndex = 0 } = this.state;
		return items.sort((a, b) => ((a.sort || MAX) - (b.sort || MAX))).map((item, index) => (
			<div className={ `navi-item ${ (cateIndex === index) ? 'current' : '' }` } key={ index } onClick={ () => this.setState({ cateIndex: index, codeIndex: 0 }) }>
				<Icon x={ (item.unique || 'x').toLowerCase() } />
				<span>{ item.name || item.unique || '未命名' }</span>
			</div>
		));
	}

	showCateItems() {
		const { items = [], cateIndex = 0, codeIndex = 0 } = this.state;
		const cate = items[cateIndex];
		if(!cate) {
			return (
				<div>当前分类为空</div>
			);
		}
		return (cate.snippets || []).map((item, index) => (
			<div className={ `snippet ${ (codeIndex === index) ? 'current' : '' }` } key={ index } onClick={ () => this.setState({ codeIndex: index }) }>
				<span>{ item.title }</span>
			</div>
		));
	}

	showSnippetBoard() {
		const { items = [], cateIndex = 0, codeIndex = 0 } = this.state;
		const cate = items[cateIndex];
		if(!cate) {
			return (
				<div>分类为空</div>
			);
		}
		const { snippets } = items[cateIndex];
		if(!snippets || !Array.isArray(snippets) || !snippets[codeIndex]) {
			return (
				<div>代码为空</div>
			);
		}
		const snippet = snippets[codeIndex];
		setTimeout(() => {
			highlightCodeBlock();
		}, 100);
		return (
			<Fragment>
				<div className="meta">
					<div className="title">
						<span>{ snippet.title || '' }</span>
					</div>
					<div className="operations">
						{ (codeIndex < (snippets.length - 1)) && (
							<span className="action" onClick={ () => this.setState({ codeIndex: codeIndex + 1 }) }>下一个</span>
						) }
						{ (codeIndex > 0) && (
							<span className="action" onClick={ () => this.setState({ codeIndex: codeIndex - 1 }) }>上一个</span>
						) }
						<a className="action" href={ `${cate.url}#discussion_bucket` } rel="noopener noreferrer" target="_blank">编辑</a>
						<a className="action" href={ `${cate.url}#issue-comment-box` } rel="noopener noreferrer" target="_blank">新建片段</a>
					</div>
				</div>
				<div className="mark">
					<div className="content">
						<Markdown children={ snippet.content || '' } options= { markdownOptions } />
					</div>
				</div>
			</Fragment>
		)

	}

	render() {
		const { loading, items = [], cateIndex = 0 } = this.state;
		if(loading) {
			return (
				<Loading />
			);
		}
		return (
			<div id="snippets">
				<div className="navi">
					{/* <div className="top-cate">Inbox</div> */}
					<div className="labels">
						{ this.showTags() }
					</div>
					<div className="back">
						<Link to="/">返回主页</Link>
					</div>
				</div>
				{ items[cateIndex].snippets.length ? (
					<Fragment>
						<div className="list">
							{ this.showCateItems() }
							{/*
							<div className="search">
								<input type="text" placeholder="输入关键字搜索代码片段"/>
							</div>
							*/}
						</div>
						<div className="main">
							{ this.showSnippetBoard() }
						</div>
					</Fragment>
				) : (
					<div className="empty">
						<span>该类别为空，立即</span>
						<a href={ items[cateIndex].url } rel="noopener noreferrer" target="_blank">新增代码片段</a>
					</div>
				) }

			</div>
		)
	}

}

export default withRouter(Snippets);