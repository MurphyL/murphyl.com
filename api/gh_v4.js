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
	axios.post(endpoint, params, XHR_CONFIG).then(fetched => {
		console.log('数据查询参数：', req.body);
		console.log('数据查询完毕：', fetched);
		res.json({
			code: 0,
			payload: {
				fetched
			}
		});
	}).catch(({ message }) => {
		console.log('数据查询参数：', req.body);
		console.error('数据查询出错：', message);
		res.json({
			code: 1,
			payload: {
				message,
				params: req.body,
				type: typeof(req.body)
			}
		});
	});
};