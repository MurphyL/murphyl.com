import lowdb from 'lowdb';
import MemoryAdapter from 'lowdb/adapters/Memory';

import { ajaxGet, ajaxPost } from './rest_client';

const root = process.env.PUBLIC_URL;

const ghConfig = {};

const ghEndpoint = '/api/gh_v4';

const mapper = ajaxGet(`${root}/graphql.json`).then((resp) => {
	return (resp.code === 0) ? resp.payload : {};
});


const githubInvoke = (dsl) => (
	ajaxPost(ghEndpoint, {
		query: dsl,
		variables: {
			owner: 'MurphyL',
			repo: 'murphyl.com',
			type: 'X-POST',
			size: 5
		}
	}, ghConfig)
);

export const fetchBlogItems = async () => {
	const { github_fetch_issues } = await mapper;
	const x = await githubInvoke(github_fetch_issues);
	console.log(x);
};

fetchBlogItems();

export const fetched = ajaxGet('murph.x.json').then((res) => {
	const db = lowdb(new MemoryAdapter('x'));
	db.defaults(res.payload || { blog: [] }).write();
	return db;
});

export const blogFetched = fetched.then(db => db.get('blog'));
