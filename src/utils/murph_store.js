import { ajaxGet, ajaxPost } from './rest_client';

const root = process.env.PUBLIC_URL;

const ghConfig = {
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
};

const ghEndpoint = '/api/gh_v4';

const mapper = ajaxGet(`${root}/graphql.json`).then((resp) => {
	return (resp.code === 0) ? resp.payload : {};
});

const repoInfo = {
	owner: process.env.REACT_APP_OWNER,
	repo: process.env.REACT_APP_REPO,
};

const invoke = (dsl, params) => {
	return ajaxPost(ghEndpoint, {
		query: dsl,
		variables: Object.assign(params, repoInfo)
	}, ghConfig);
};

export const fetchBlogItems = async (params) => {
	const { direction, fetch } = params;
	const { fetch_post_issues } = await mapper;
	const ql = fetch_post_issues.replace('#PAGE_DIRECTION#', direction).replace('#FETCH_POSTION#', fetch);
	const { code, payload } = await invoke(ql, Object.assign({
		type: 'X-POST'
	}, params));
	return (code === 0 && payload.status === 200) ? payload : {};
};

export const getBlogDetails = async (id) => {
	const { get_post_issue_detail } = await mapper;
	const { code, payload } = await invoke(get_post_issue_detail, { id });
	return (code === 0 && payload.status === 200) ? payload : {};
};

export const fetchCodeItems = async (params) => {
	const { fetch_code_issues } = await mapper;
	const { code, payload } = await invoke(fetch_code_issues, Object.assign({
		type: 'X-CODE'
	}, (params || { size: 20 })));
	return (code === 0 && payload.status === 200) ? payload : {};
};


export const executeGraphQl = async (id = 'test_api', params) => {
	const dsl = (await mapper)[id];
	const { code, payload } = await invoke(dsl, params || {});
	return (code === 0 && payload.status === 200) ? payload : {};
};
