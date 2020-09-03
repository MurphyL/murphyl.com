import React, { Component } from 'react';

import './murph_toast.css';

const POSTION_CONFIG = {
	bottom: {
		bottom: '30px',
		right: '30px',
	}
};

class MurphToast extends Component {

	render() {
		const { postion = 'bottom' } = this.props;
		return (
			<div className="murph-toast" style={ POSTION_CONFIG[postion] }>x</div>
		);
	}
	
};

export default MurphToast;