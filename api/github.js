const axios = require('axios');
const lodash = require('lodash');

const { GITHUB_TOKEN } = process.env;
const githubUser = process.env.NOW_GITHUB_ORG;
const githubRepo = process.env.NOW_GITHUB_REPO;

const githubConfig = {
	headers:{
		Authorization: `Bearer ${GITHUB_TOKEN}`
	}
};

const endpoint = 'https://api.github.com/graphql';

const QUERY_REPO = `query{ repository(owner:"${githubUser}", name:"${githubRepo}") { id } }`;

const repoFetched = axios.post(endpoint, { query: QUERY_REPO }, githubConfig);

export default async (req, res) => {
	const { message = 'hello, murph' } = req.query;
	const result = {};
	try{
		const { data } = await repoFetched.then(({ data }) => data);
		const repositoryId = lodash.get(data, 'repository.id');
		console.log('查询到的仓库ID：', data, repositoryId);
		Object.assign(result, {
			code: 0,
			payload: {
				repositoryId,
			}
		});
	} catch(error) {
		console.log('出错：', error);
		Object.assign(result, {
			code: 1,
			message: '获取文章评论信息出错：' + error.message
		})
	}
	res.json(result);
};