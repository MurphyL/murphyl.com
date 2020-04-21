import React, { Component, Fragment } from 'react';

export default class Footer extends Component {

	constructor (props) {
		super();
	}

	render() {
		return (
			<footer>
				<div>{ process.env.appTitle }</div>
			</footer>
		)
	}

}