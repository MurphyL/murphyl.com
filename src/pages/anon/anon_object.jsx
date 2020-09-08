import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import lodashGet from 'lodash/get';

import { executeGraphQl } from 'utils/murph_store';

import './anon_object.css';


class PostLayout extends Component {

	render() {
		return (
			<div className="layout">POST</div>
		)
	}

}

class CodeLayout extends Component {

	render() {
		return (
			<div className="layout">CODE</div>
		)
	}

}

class AnnoLayout extends Component {
	
	render() {
		return (
			<div className="layout">UNKNOW</div>
		)
	}

}

class DrawLayout extends Component {

	render() {
		const { layout } = this.props;
		switch(layout) {
			case 'post':
				return (
					<PostLayout />
				);
			case 'code':
				return (
					<CodeLayout />
				);
			default:
				return (
					<AnnoLayout />
				);
		};
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
            const obj = lodashGet(resp, 'data.repository.issue');
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
		const labels = lodashGet(obj, 'labels.nodes') || [];
		return (
			<div id="anon-object">
				<div className="top">
					<div className="title">{ obj.title || '' }</div>
					<div className="labels">
						{ labels.map((label, index) => (
							<span key="index"  className="label">{ label.description }</span>
						)) }
					</div>
				</div>
				<div className="x">
					<DrawLayout layout="other" />
				</div>
			</div>
		);
	}

};

export default withRouter(AnonObject);