import React, { Component, Fragment } from 'react';

import { Link, withRouter } from "react-router-dom";

import * as matter from 'gray-matter';

import lodashGet from 'lodash/get';

import { Loading } from 'core/loading/loading';

import { fetchCodeItems } from 'utils/murph_store';

import MurphIcon from 'includes/murph_icon.jsx';

import { CodeSnippet } from '../code_board/code_board.jsx';

import { CopyToClipboard } from 'react-copy-to-clipboard';

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
			    	return { id: code.id, sid: code.databaseId, ...temp.data, content: temp.content };
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
				loading: false,
				copiable: true
			});
		});
	}

	showTags() {
		const { items = [], cateIndex = 0 } = this.state;
		return items.sort((a, b) => ((a.sort || MAX) - (b.sort || MAX))).map((item, index) => (
			<div className={ `navi-item ${ (cateIndex === index) ? 'current' : '' }` } key={ index } onClick={ () => this.setState({ cateIndex: index, codeIndex: 0 }) }>
				<MurphIcon x={ (item.unique || 'x').toLowerCase() } />
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

	onLinkCopy(e) {
		const { copiable }  = this.state;
		if(!copiable) {
			return;
		}
		this.setState({ message: '成功', copiable: false });
		setTimeout(() => {
			this.setState({ message: '链接', copiable: true });
		}, 3000);
	}

	navi(disabled, direction) {
		if(!disabled) {
			return;
		}
		const { codeIndex = 0 } = this.state;
		this.setState({ codeIndex: direction ? codeIndex + 1 : codeIndex - 1 });
	}

	showSnippetBoard() {
		const { items = [], cateIndex = 0, codeIndex = 0, fullscreen, message = '链接' } = this.state;
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
		if(!snippet) {
			return (
				<div>加载片段错误</div>
			);
		}
		const hasNext = codeIndex < (snippets.length - 1);
		const hasPrev = codeIndex > 0;
		document.title = `${snippet.title} | 代码片段`;
		return (
			<CodeSnippet { ...snippet }>
				<span className={ `action ${ hasNext ? '' : 'disabled' }` } onClick={ () => this.navi.bind(this)(hasNext, 1) }>下一个</span>
				<span className={ `action ${ hasPrev ? '' : 'disabled' }` } onClick={ () => this.navi.bind(this)(hasPrev, 0) }>上一个</span>
				<a className="action" href={ `${cate.url}#issuecomment-${snippet.sid}` } rel="noopener noreferrer" target="_blank">编辑代码</a>
				<CopyToClipboard text={ `${window.location.origin}/code/board/${snippet.id}` } onCopy={ this.onLinkCopy.bind(this) }>
					<span className="action murph-popup" pop-message="拷贝成功">拷贝{ message }</span>
				</CopyToClipboard>
				<span className="action" onClick={ () => this.setState({ fullscreen: !fullscreen }) }>全屏</span>
			</CodeSnippet>
		);
	}

	render() {
		const { loading, items = [], cateIndex = 0, fullscreen } = this.state;
		if(loading) {
			document.title = '代码片段 - 加载中……';
			return (
				<Loading />
			);
		}
		document.title = '代码片段';
		return (
			<div id="snippets" className={ fullscreen ? 'fullscreen' : '' }>
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
					<div className="main">
						<div className="empty">
							<span>该类别为空，立即</span>
							<a href={ items[cateIndex].url } rel="noopener noreferrer" target="_blank">新增代码片段</a>
						</div>
					</div>
				) }
			</div>
		)
	}

}

export default withRouter(Snippets);