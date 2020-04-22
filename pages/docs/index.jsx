import React, { Component, Fragment } from 'react';

import Markdown from 'react-markdown';

import config from '../../docs/_doc.json';


import  FileUtils from '../../utils/FileUtils';
import  BlogUtils from '../../utils/BlogUtils';

// 获取数据
export async function getStaticProps() {
	const items = FileUtils.listDocs(true) || [];
	const docs = {};
	items.forEach(({ filename, source }) => {
		const doc = BlogUtils.reslovePostMeta(source);
		docs[filename] = Object.assign(doc, { filename });
	});
	return {
		props: {
			title: '笔记',
			full: true,
			docs,
		}
	}
}

class Navigaror extends Component {

	render() {
		const { docs } = this.props;
		return (
			<dl>
				{ config && ( Object.keys(config).map((category) => (
					<Fragment key={ category }>
						<dt>{ category }</dt>
						<dd>
							<ul>
								{ (config[category] || []).map((item, index) =>{
									return <li key={ `${category}-${index}` } onClick={ () => { this.props.selected(docs[item + '.md']) } }>{ docs[item + '.md'].meta.title }</li>
								}) }
							</ul>
						</dd>
					</Fragment>
				))) }
			</dl>
		)
	}

}

export default class DocumentViewer extends Component {

	constructor (props) {
		super();
		this.state = { };
	}

	docSelected(selected) {
		this.setState({ source: selected })
	}

	render() {
		const { docs } = this.props;
		const { source } = this.state;
		return (
			<div className="docs">
				<div className="navi">
					<Navigaror docs={ docs } selected={ this.docSelected.bind(this) } />
				</div>
				<div className="board">
					{ source && (
						<Fragment>
							<h1>{ source.meta.title }</h1>
							<div className="content">
								<Markdown escapeHtml={ false } source={ source.markdown } />
							</div>
						</Fragment>
					) }
				</div>
			</div>
		)
	}

}
