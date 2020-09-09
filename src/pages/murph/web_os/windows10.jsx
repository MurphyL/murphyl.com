import React, { Component } from 'react';


import Taskbar from './submodules/win10_taskbar.jsx';

import './windows10.css';

class Desktop extends Component {
	render() {
		return (
			<div className="desktop">Desktop</div>
		);
	}
}

class Windows10 extends Component {

	render() {
		document.title = 'Windows 10';
		return (
			<div id="windows10">
				<Desktop />
				<Taskbar />
			</div>
		);
	}

}

export default Windows10;