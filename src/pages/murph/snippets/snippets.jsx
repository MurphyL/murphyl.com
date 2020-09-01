import React, { Component } from 'react';

import * as matter from 'gray-matter';

import Markdown from 'markdown-to-jsx';

import lodashGet from 'lodash/get';

import { fetchCodeItems } from '../../../utils/murph_store';

import { markdownOptions, highlightCodeBlock } from '../../../utils/mark_config.jsx';

import './snippets.css';

const matterConfig = { 
    excerpt: true, 
    delims: '```',
};

class Snippets extends Component {

	state = { loading: true };

	componentDidMount() {
		fetchCodeItems({ size: 30 }).then(resp => {
			const items = (lodashGet(resp, 'data.repository.issues.nodes') || []).map(item => {
			    const parsed = matter(item.body, matterConfig);
			    const { id, title, comments } = item;
			    const snippets = (comments.nodes || []).map(code => {
			    	const temp = matter(code.body, matterConfig);
			    	return { ...temp.data, content: temp.content };
			    });
			    const { content, data } = parsed;
				return Object.assign((data || {}), { 
					id, title, content, snippets
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
		const { items = [] } = this.state;
		return items.map((item, index) => (
			<div className="navi-item" key={ index } onClick={ () => this.setState({ cateIndex: index }) }>
				<span>{ item.unique }</span>
			</div>
		))
	}

	showCateItems() {
		const { items = [], cateIndex = 0 } = this.state;
		const cate = items[cateIndex];
		if(!cate) {
			return (
				<div>当前分类为空</div>
			);
		}
		return (cate.snippets || []).map((item, index) => (
			<div className="snippet" key={ index } onClick={ () => this.setState({ codeIndex: index }) }>
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
			<div className="content">
				<div className="meta">
					<div>
						<span>{ snippet.title || '' }</span>
					</div>
				</div>
				<div className="main">
					<Markdown children={ snippet.content || '' } options= { markdownOptions } />
				</div>
			</div>
		)

	}

	render() {
		const { loading } = this.state;
		if(loading) {
			return (
				<div>数据加载中……</div>
			);
		}
		return (
			<div id="snippets">
				<div className="navi">
					<ul>
						<li><b>Inbox</b></li>
						<li><b>Tags</b></li>
					</ul>
					<div className="labels">
						{ this.showTags() }
					</div>
				</div>
				<div className="list">
					{ this.showCateItems() }
				</div>
				<div className="mark">
					{ this.showSnippetBoard() }
				</div>
			</div>
		)
	}

}

export default Snippets;