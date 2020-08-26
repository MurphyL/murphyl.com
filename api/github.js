const axios = require('axios');

const githubWebhook = 'https://api.github.com/graphql';

const githubToken = process.env.GITHUB_WEBHOOK;
const githubUser = process.env.NOW_GITHUB_ORG;
const githubRepo = process.env.NOW_GITHUB_REPO;

const githubConfig = {
	headers:{
		Authorization: `Bearer ${githubToken}`
	}
};

const QUERY_REPO = `query{ repository(owner:"${githubUser}", name:"${githubRepo}") { id } }`;

const repoFetched = axios.post(githubWebhook, { query: QUERY_REPO }, githubConfig);

export default async (req, res) => {
	const { message = 'hello, murph' } = req.query;
	repoFetched.then(({ data }) => {
		console.log('数据查询完成：', data);
		res.json({
			code: 0,
			payload: {
				feedback: data
			}
		});
	}).catch(error => {
		console.log('查询数据错误：', error);
		res.json({
			code: 1,
			message: '查询数据错误'
		});
	});
};