const axios = require('axios');

const { GITHUB_TOKEN } = process.env;
const owner = process.env.NOW_GITHUB_ORG;
const repo = process.env.NOW_GITHUB_REPO;

const endpoint = 'https://api.github.com/graphql';

const XHR_CONFIG = {
	headers:{
		Authorization: `Bearer ${GITHUB_TOKEN}`
	}
};

export default (req, res) => {
	console.log('参数：', req.body);
	console.log('地址：', endpoint);
	console.log('配置：', XHR_CONFIG);
	axios.post(endpoint, req.body, XHR_CONFIG).then(fetched => {
		console.log('数据查询完毕：', fetched);
		res.json({
			code: 0,
			payload: {
				fetched
			}
		});
	}).catch(error => {
		console.log('数据查询出错：', error);
		res.json({
			code: 1,
			payload: {
				error
			}
		});
	});
};