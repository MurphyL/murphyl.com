const axios = require('axios');

const { GITHUB_TOKEN } = process.env;
const owner = process.env.NOW_GITHUB_ORG;
const repo = process.env.NOW_GITHUB_REPO;

const endpoint = 'https://api.github.com/graphql';

const XHR_CONFIG = {
	responseType: 'json',
	headers:{
		'Content-Type': 'application/json;charset=utf-8',
		'Authorization': `Bearer ${GITHUB_TOKEN}`
	}
};

export default (req, res) => {
	axios.post(endpoint, req.body, XHR_CONFIG).then(fetched => {
		console.log('数据查询参数：', req.body);
		console.log('数据查询完毕：', fetched);
		res.json({
			code: 0,
			payload: {
				fetched
			}
		});
	}).catch(({ message, config }) => {
		console.log('数据查询参数：', req.body);
		console.error('数据查询出错：', message);
		res.json({
			code: 1,
			payload: {
				config,
				message,
				params: req.body,
				type: typeof(req.body)
			}
		});
	});
};