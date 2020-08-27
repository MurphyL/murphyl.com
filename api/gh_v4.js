const axios = require('axios');
const lodash = require('lodash');

const { GITHUB_TOKEN } = process.env;
const owner = process.env.NOW_GITHUB_ORG;
const repo = process.env.NOW_GITHUB_REPO;

const endpoint = 'https://api.github.com/graphql';

const XHR_CONFIG = {
	headers: {
		'Authorization': `Bearer ${GITHUB_TOKEN}`
	}
};

const demo = {
	query: 'query($user: String!) { user(login: $user) { bio, email } }',
	variables :{ 
		user: "MurphyL" 
	}
};

// 查询
export default (req, res) => {
	console.log('数据查询参数：', req.body);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
	axios({
		method: 'POST',
		url: 'https://api.github.com/graphql',
		data: req.body,
		headers: { 
			Authorization: `Bearer ${GITHUB_TOKEN}`
		},
	}).then(({ status, data }) => {
		console.log('数据查询完毕：', data);
		res.json({
			code: 0,
			payload: lodash.get(data, 'data.user')
		});
	}).catch((error) => {
		console.error('数据查询出错：', error);
		res.json({
			code: 1,
			payload: {
				error,
				params: req.body,
				type: typeof(req.body)
			}
		});
	});
};