import axios from 'axios';

const prefix = process.env.PUBLIC_URL;

export const ajaxGet = (url, params) => (
	axios.get(`${prefix}/${url}`, params || {})
	.then(({ status, data }) => {
		if(status === 200) {
			return {
				status: 0,
				payload: data
			}
		} else {
			return {
				status: 1,
				message: 'Network error!'
			}
		}
	})
	.catch(error => ({
		status: 1, message: 'Request error'
	}))
)