import { ajaxGet, ajaxPost } from './rest_client';

const root = process.env.PUBLIC_URL;

const ghConfig = {};

const ghEndpoint = '/api/gh_v4';

const mapper = ajaxGet(`${root}/graphql.json`).then((resp) => {
	return (resp.code === 0) ? resp.payload : {};
});

const invoke = (dsl, params) => (
	ajaxPost(ghEndpoint, {
		query: dsl,
		variables: params
	}, ghConfig)
);

export const fetchBlogItems = async () => {
	const { github_fetch_issues } = await mapper;
	const { code, payload } = await invoke(github_fetch_issues, {
		owner: 'MurphyL',
		repo: 'murphyl.com',
		type: 'X-POST',
		size: 5
	});
	return (code === 0 && payload.status === 200) ? payload : {};
};

export const getBlogDetails = async (id) => {
	const { github_issue_detail } = await mapper;
	const { code, payload } = await invoke(github_issue_detail, { id });
	return (code === 0 && payload.status === 200) ? payload : {};
};

