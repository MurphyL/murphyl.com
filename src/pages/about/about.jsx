import React, { Component, Fragment } from 'react';

import axios from 'axios';

class About extends Component {

	componentDidMount() {
		axios.post('https://1575031850916956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/increase_x/authorize/web', {
			"action": "login", "username": "murph", "password": "m!n&f1!"
		})
		.then(res => {
			console.log('then', res)
		})
		.catch(res => {
			console.log('catch', res)	
		})
	}

	render() {
	    return (
	        <div style={{ padding: '20vh 0 100px', textAlign: 'center' }}>about</div>
	    );
	}
}

export default About;