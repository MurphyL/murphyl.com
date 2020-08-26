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
	const result = {};
	try{
		const { data } = await repoFetched;
		Object.assign(result, {
			code: 0,
			payload: {
				data
			}
		});
	} catch(error) {
		Object.assign(result, {
			code: 1,
			message: '获取文章评论信息出错'
		})
	}
	res.json(result);
};