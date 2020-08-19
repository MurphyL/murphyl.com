import lowdb from 'lowdb';
import MemoryAdapter from 'lowdb/adapters/Memory';

import { ajaxGet } from './rest_client';

const blogFetched = ajaxGet('murph.x.json').then((res) => {
	const db = lowdb(new MemoryAdapter('x'));
	db.defaults(res.payload || { blog: [] }).write();
	return db.get('blog');
});

export default blogFetched;