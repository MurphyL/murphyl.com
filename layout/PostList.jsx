import React, { Component, Fragment } from 'react';

export default class PostList extends Component {
	render() {
		return <div>PostList - { JSON.stringify(this.props) }</div>
	}
}