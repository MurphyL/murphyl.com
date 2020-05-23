import axios from 'axios';

const prefix = process.env.PUBLIC_URL;

export const ajaxGet = (url, params) => (
	axios.get(`${prefix}/${url}`, params || {})
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
)