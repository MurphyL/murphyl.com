import React, { Component, Fragment } from 'react';

import { withRouter } from "react-router-dom";

import { get, countBy } from 'lodash';

import Markdown from 'markdown-to-jsx';

import * as matter from 'gray-matter';

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
		const { tag, title } = this.props;
		return (
			<div className="top">
				<div className="title">{ title }</div>
				<div className="labels">
					<span className="label">{ tag }</span>
				</div>
			</div>
		)
	}

}

class PostLayout extends Component {

	render() {
		const { title } = this.props.post;
		const parsed = revisePost(this.props.post);
		return (
			<Fragment>
				<LayoutTop tag="POST" title={ title } />
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



	showCode() {
		return (
			<div className="tab">
				<div className="selector">
					<div className="wrapper">
						{ this.showTabs.bind(this)() }
					</div>
				</div>
				<div className="content">
					<Markdown children={ this.showMarkdown() || '' } options= { markdownOptions } />
				</div>
			</div>
		);
	}

	showTabs() {
		const { current } = this.state;
		const comments = get(this.props.code, 'comments.nodes') || [];
		return (comments || []).map((comment, index) => {
			const { data, content } = matter(comment.body, matterConfig);
			return (
				<div key={ index } className={ `tab-item ${ (current === index) ? 'current' : '' }`.trim() } onClick={ () => this.setState({ current: index, content }) }>
					<span>{ (index + 1) + ((current === index) ? `. ${data.title}` : '') }</span>
				</div>
			);
		});
	}

	showMarkdown() {
		const { current } = this.state;
		const comment = get(this.props.code, `comments.nodes[${current}]`) || {};
		const { content } = matter((comment.body || ''), matterConfig);
		return content;
	}

	render() {
		const { title } = this.props.code || {};
		return (
			<Fragment>
				<LayoutTop tag="CODE" title={ title } />
				<div className="layout mark">
					<div className="code">
						{ this.showCode() }
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
				<LayoutTop tag="TODO" title={ title } />
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