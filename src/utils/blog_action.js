import { ajaxGet } from './rest_client';

const blogFetched = ajaxGet('murph.x.json');

const blogStore = async (state = [], action) => {
	const { code, payload } = await blogFetched;
	const items = payload.blog || [];
	switch (action.type) {
		case 'FETCH_POSTS':
			return code === 0 ? items : [];
		case 'LOCAL_POST':
			const { filename } = action;
			return items.filter((item, index) => {
				item.index = index;
				return item.filename === filename;
			});
		case 'ARTICLE_NAV':
			return [];
		default:
			return state;
	}
}

export default blogStore