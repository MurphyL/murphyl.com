import React, { Component } from 'react';

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
		const { loading, labels = [], selectedLabel } = this.state;
		return (
			<Loadable id="murph-explorer" status={ loading }>
				<div className="top">
					<div className="labels">
						{ labels.map(({ name }, index) => {
							const className = (selectedLabel === index) ? 'current' : 'none';
							const props = { 
								className, key: index, 
								onClick: () => this.setState({
									selectedLabel: index
								}) 
							};
							return (
								<div { ...props }>{ name || 'X-ANNO' }</div>
							);
						}) }
					</div>
				</div>
			</Loadable>
		);
	}

}

export default MurphExplorer;