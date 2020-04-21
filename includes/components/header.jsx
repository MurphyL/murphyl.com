import React, { Component, Fragment } from 'react';

export default class Header extends Component {

	constructor (props) {
		super();
	}

	render() {
		const navItems = process.env.header || [];
		return (
			<header>
				<div className="logo">
					<a href="/">{ process.env.appTitle }</a>
				</div>
				<ul className="navi">
					{ navItems && navItems.map((item, index) => (
						<li key={ index }>
							<a href={ `${item.url || '/'}` }>{ item.label }</a>
						</li>
					))}
				</ul>
			</header>
		)
	}

}