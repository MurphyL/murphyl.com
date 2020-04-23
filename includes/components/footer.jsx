import React, { Component, Fragment } from 'react';

export default class Footer extends Component {

	constructor (props) {
		super();
	}

	render() {
		return (
			<footer>
				<div className="container">
					<div className="sitemap">
						<div className="logo">
							<a href="/"><img src="/image/icon.png" /></a>
						</div>
						<dl className="section navi">
							<dt>站点地图</dt>
							<dd>
								<ul>
									<li><a href="/blog">博客</a></li>
									<li><a href="/docs">笔记</a></li>
								</ul>
							</dd>
						</dl>
						<dl className="section links">
							<dt>友情链接</dt>
							<dd>
								<ul>
									<li><a href="https://cijian.us" target="_blank">此间·我们</a></li>
								</ul>
							</dd>
						</dl>
						<dl className="section social">
							<dt>社交</dt>
							<dd>
								<ul>
									{(process.env.social && process.env.social.github) && (
										<li>
											<a href={ `https://github.com/${ process.env.social.github }` } target="_blank">
												<img alt="GitHub followers" src={ `https://img.shields.io/github/followers/${ process.env.social.github }?label=Follow&style=social` } />
											</a>
										</li>
									)}
								</ul>
							</dd>
						</dl>
					</div>
					<div className="copyright">
						<div>Copyright © 2020 { process.env.appTitle }. All rights reserved.</div>
					</div>
				</div>
			</footer>
		)
	}

}