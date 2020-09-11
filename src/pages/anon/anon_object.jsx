import React, { Component, Fragment } from 'react';

import { Link, withRouter } from "react-router-dom";

import { get, countBy } from 'lodash';

import Markdown from 'markdown-to-jsx';

import * as matter from 'gray-matter';

import MurphIcon from 'includes/murph_icon.jsx';

import { revisePost } from 'utils/article_utils';

import { markdownOptions } from 'includes/mark_config.jsx';

import { Loading } from 'core/loading/loading.jsx';

import { executeGraphQl } from 'utils/murph_store';

import './anon_object.css';

const matterConfig = { 
    excerpt: true, 
    delims: '```',
};

class LayoutTop extends Component {

	render() {
		const { tag } = this.props;
		return (
			<div className="top">
				<div className="meta">
					<span className="label">{ tag }</span>
					<div className="children">{ this.props.children }</div>
				</div>
				<div className="operations">
					<div className="back">
						<Link to="/">
							<MurphIcon x="home" />
						</Link>
					</div>
				</div>

			</div>
		)
	}

}

class PostLayout extends Component {

	render() {
		console.log(this.props.post);
		const { number, title } = this.props.post;
		const parsed = revisePost(this.props.post);
		return (
			<Fragment>
				<LayoutTop tag="POST">
					<div className="title">
						<Link to={ `/post/${number}` }>{ title }</Link>
					</div>
				</LayoutTop>
				<div className="layout mark">
					<div className="content">
						<Markdown children={ parsed.content || '' } options= { markdownOptions } />
					</div>
				</div>
			</Fragment>
		)
	}

}

class CodeLayout extends Component {

	state = {
		current: 0
	}

	showSelect(comments, current) {
		return (
			<div className="single-select">
				<div className="current">{ comments[current].data.title } ▾</div>
				<div className="items">
					{ (comments || []).map((comment, index) => {
						return (
							<div key={ index } className="item" onClick={ () => this.setState({ current: index }) }>
								<span className={ current === index ? "current" : "" }>{ comment.data.title || '无标题代码片段' }</span>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	render() {
		const { current } = this.state;
		const comments = (get(this.props, 'code.comments.nodes') || []).map(comment => {
			return Object.assign(comment, matter(comment.body, matterConfig));
		});
		return (
			<Fragment>
				<LayoutTop tag="CODE">
					{ this.showSelect(comments, current) }
				</LayoutTop>
				<div className="layout mark">
					<div className="code">
						<div className="content">
							<Markdown children={ comments[current].content || '' } options= { markdownOptions } />
						</div>
					</div>
				</div>
			</Fragment>
		)
	}

}

class AnnoLayout extends Component {
	
	render() {
		return (
			<Fragment>
				<LayoutTop tag="ANNO" title={ 'TODO' } />
				<div className="layout">TODO</div>
			</Fragment>
		)
	}

}

class TodoLayout extends Component {
	
	render() {
		const { title, body } = this.props.todo || {};
		return (
			<Fragment>
				<LayoutTop tag="TODO">
					<div className="title">{ title }</div>
				</LayoutTop>
				<div className="layout mark">
					<div className="content">
						<Markdown children={ body || '' } options= { markdownOptions } />
					</div>
				</div>
			</Fragment>
		)
	}

}

class AnnoBoard extends Component {

	render() {
		const obj = this.props.x || {};
		const { labels = {} } = obj;
		const countLabels = countBy(labels.nodes || [], 'name');
		if(countLabels['X-TODO'] > 0) {
			return (
				<TodoLayout todo={ obj } />
			);
		}
		if(countLabels['X-POST'] > 0) {
			return (
				<PostLayout post={ obj } />
			);
		}
		if(countLabels['X-CODE'] > 0) {
			return (
				<CodeLayout code={ obj } />
			);
		}
		return (
			<AnnoLayout />
		);
	}

}

class AnonObject extends Component {

	state = {
		loading: true
	}

	componentDidMount() {
		const { number } = this.props.match.params || {};
        executeGraphQl('get_issue_detail', {
            owner: 'MurphyL',
            repo: 'murphyl.com',
            number: parseInt(number)
        }).then(resp => {
            const obj = get(resp, 'data.repository.issue');
            this.setState({ loading: false, obj });
        });
	}

	render() {
		const { obj, loading } = this.state;
		if(loading) {
			return (
				<Loading />
			);
		}
		return (
			<div id="anon-object">
				<AnnoBoard x={ obj } />
			</div>
		);
	}

};

export default withRouter(AnonObject);