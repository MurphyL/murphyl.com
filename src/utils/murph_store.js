import lowdb from 'lowdb';
import MemoryAdapter from 'lowdb/adapters/Memory';

import { ajaxGet, ajaxPost } from './rest_client';

const root = process.env.PUBLIC_URL;
const token = process.env.REACT_APP_TOKEN;

const ghConfig = {};

let ghEndpoint = `${root}/api/github`;

if(token) {
	ghEndpoint = 'https://api.github.com/graphql';
	Object.assign(ghConfig, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
}

ajaxGet(`${root}/graphql.json`).then(({ code, payload }) => {
	const { github_fetch_issues } = payload;
	ajaxPost(ghEndpoint, {
		query: github_fetch_issues,
		variables: {
			owner: 'MurphyL',
			repo: 'murphyl.com',
			type: 'X-POST',
			size: 5
		}
	}, ghConfig).then(resp => {
		console.log(resp);
	})
});

export const fetched = ajaxGet('murph.x.json').then((res) => {
	const db = lowdb(new MemoryAdapter('x'));
	db.defaults(res.payload || { blog: [] }).write();
	return db;
});

export const blogFetched = fetched.then(db => db.get('blog'));
