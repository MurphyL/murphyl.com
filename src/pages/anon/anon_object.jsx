import React, { Component, Fragment } from 'react';

import { withRouter } from "react-router-dom";

import { get, countBy } from 'lodash';

import { executeGraphQl } from 'utils/murph_store';

import './anon_object.css';

class LayoutTop extends Component {

	render() {
		const { tag, title } = this.props;
		return (
			<div className="top">
				<div className="title">{ title }</div>
				<div className="labels">
					<span>{ tag }</span>
				</div>
			</div>
		)
	}

}

class PostLayout extends Component {

	render() {
		return (
			<Fragment>
				<LayoutTop tag="POST" title={ 'TODO' } />
				<div className="layout">TODO</div>
			</Fragment>
		)
	}

}

class CodeLayout extends Component {

	render() {
		return (
			<Fragment>
				<LayoutTop tag="CODE" title={ 'TODO' } />
				<div className="layout">TODO</div>
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
		const { title, content } = this.props
		return (
			<Fragment>
				<LayoutTop tag="TODO" title={ title } />
				<div className="layout">{ content }</div>
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
				<TodoLayout title={ obj.title } content={ obj.body } />
			);
		}
		if(countLabels['X-POST'] > 0) {
			return (
				<PostLayout />
			);
		}
		if(countLabels['X-CODE'] > 0) {
			return (
				<CodeLayout />
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
				<div>Loading……</div>
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