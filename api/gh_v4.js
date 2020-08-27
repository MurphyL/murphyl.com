const axios = require('axios');

const { GITHUB_WEBHOOK } = process.env;
const owner = process.env.NOW_GITHUB_ORG;
const repo = process.env.NOW_GITHUB_REPO;

const endpoint = 'https://api.github.com/graphql';

const XHR_CONFIG = {
	headers:{
		Authorization: `Bearer ${GITHUB_WEBHOOK}`
	}
};

export default async (req, res) => {
	console.log(req.body);
	const { query, variables = {} } = JSON.parse(req.body);
	Object.assign(variables, { owner, repo });
	axios.post(endpoint, { query, variables }, XHR_CONFIG)
	.then(fetched => {
		console.log('数据查询完毕：', fetched);
		res.json({
			code: 0,
			payload: {
				fetched
			}
		});
	})
	.catch(error => {
		console.log('数据查询出错：', error);
		res.json({
			code: 1,
			payload: {
				error
			}
		});
	})
};