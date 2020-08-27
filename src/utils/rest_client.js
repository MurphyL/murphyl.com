import axios from 'axios';

export const ajaxGet = (url, params) => (
	axios.get(url, params || {})
	.then(({ status, data }) => {
		if(status === 200) {
			return {
				code: 0,
				payload: data
			}
		} else {
			return {
				code: 1,
				message: 'Network error!'
			}
		}
	})
	.catch(error => ({
		code: 1, message: 'Request error'
	}))
);

export const ajaxPost = (url, params, header) => (
	axios.post(url, params || {}, header || {})
	.then(({ status, data }) => {
		if(status === 200) {
			return {
				code: 0,
				payload: data
			}
		} else {
			return {
				code: 1,
				message: 'Network error!'
			}
		}
	})
	.catch(error => ({
		code: 1, message: 'Request error'
	}))
);

