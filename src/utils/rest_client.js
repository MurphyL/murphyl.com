import axios from 'axios';

const prefix = process.env.PUBLIC_URL;

export const ajaxGet = (url, params) => {
	return axios.get(`${prefix}/${url}`, params || {});
}