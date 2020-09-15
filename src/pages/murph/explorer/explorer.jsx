import React, { Component } from 'react';

import { Tag } from 'antd';

import { get } from 'lodash';

import { executeGraphQl } from 'utils/murph_store';

import { Loadable } from 'core/loading/loading.jsx';

import './explorer.css';

const LABELS_PATH = 'data.repository.labels.nodes';

class MurphExplorer extends Component {

	state = {
		loading: 1,
		labels: [],
		selectedLabel: 0
	}

	componentDidMount() {
		executeGraphQl('fetch_repo_lables').then(resp => {
			const labels = get(resp, LABELS_PATH);
			this.setState({ loading: 0, labels });
		}).catch(error => {
			this.setState({ 
				loading: 2,
				message: '加载仓库标签出错'
			});
		})
	}

	render() {
		const { loading, labels = [] } = this.state;
		return (
			<Loadable id="murph-explorer" status={ loading }>
				<div className="top">
					<div className="labels">
						{ labels.map(({ name, color, description }, index) => (
							<Tag key={ index } color={ `#${color}` }>{ description || '其他' }</Tag>
						)) }
					</div>
				</div>
			</Loadable>
		);
	}

}

export default MurphExplorer;