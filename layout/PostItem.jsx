import React, { Component, Fragment } from 'react';

export default class PostItem extends Component {
	render() {
		return <div>PostItem - { JSON.stringify(this.props) }</div>
	}
}