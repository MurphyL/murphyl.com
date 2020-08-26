const axios = require('axios');
const lodashGet = require('lodash.get');

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

const createIssue = ({ repositoryId, title, body }) => (`mutation CreateIssuePayload { createIssue(input:{ repositoryId: "${ repositoryId }", title: "${ title }", body: "${ body }" }) { clientMutationId } }`);

const repoFetched = axios.post(githubWebhook, { query: QUERY_REPO }, githubConfig);

export default async (req, res) => {
	const { message = 'hello, murph' } = req.query;
	const result = {};
	try{
		const { data } = await repoFetched;
		const repositoryId = lodashGet(data, 'data.repository.id');
		console.log('查询到的仓库ID：', data, repositoryId);
		const params = { repositoryId, title: 'x', body: 'y' };
		axios.post(githubWebhook, { query: createIssue(params) }, githubConfig);
		Object.assign(result, {
			code: 0,
			payload: {
				repositoryId
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