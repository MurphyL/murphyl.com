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

const query

export default async (req, res) => {
	const { message = 'hello, murph' } = req.query;
	const result = {};
	try{
		const { id } = repoFetched.then(({ data = {} }) => (data.repository || {}));
		result.code = 0;
		result.payload = {
			repositoryId: id
		};
	} catch(error) {
		result.code = 1;
		result.message = '获取文章评论信息出错';
	}
	res.json(result);
};