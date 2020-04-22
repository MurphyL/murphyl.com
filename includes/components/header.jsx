import React, { Component, Fragment } from 'react';

import Link from 'next/link'

export default class Header extends Component {

	constructor (props) {
		super();
	}

	render() {
		const navItems = process.env.header || [];
		return (
			<header>
				<div className="container">
					<div className="logo">
						<Link href="/">
							<a>{ process.env.appTitle }</a>
						</Link>
					</div>
					<ul className="navi">
						{ navItems && navItems.map((item, index) => (
							<li key={ index }>
								<Link href={ `${item.url || '/'}` }>
									<a>{ item.label }</a>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</header>
		)
	}

}