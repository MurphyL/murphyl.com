import lowdb from 'lowdb';
import MemoryAdapter from 'lowdb/adapters/Memory';

import { ajaxGet } from './rest_client';

export const fetched = ajaxGet('murph.x.json').then((res) => {
	const db = lowdb(new MemoryAdapter('x'));
	db.defaults(res.payload || { blog: [] }).write();
	return db;
});

export const blogFetched = fetched.then(db => db.get('blog'));
