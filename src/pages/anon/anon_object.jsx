import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import lodashGet from 'lodash/get';

import { executeGraphQl } from 'utils/murph_store';

class AnonObject extends Component {

	state = {
		loading: true
	}

	componentDidMount() {
		const { number } = this.props.match.params || {};
		console.log('文章ID：', number);
        executeGraphQl('get_issue_detail', {
            owner: 'MurphyL',
            repo: 'murphyl.com',
            number: parseInt(number)
        }).then(resp => {
            const obj = lodashGet(resp, 'data.repository.issue');
            console.log('匿名对象：', obj);
            this.setState({ loading: false, obj });
        });
	}

	render() {
		return (
			<pre>
				<code>{ JSON.stringify(this.state, null, '\t') }</code>
			</pre>
		);
	}

};

export default withRouter(AnonObject);