import { ajaxGet } from './rest_client';


const blogStore = async (state = [], action) => {
	switch (action.type) {
		case 'FETCH_POSTS':
			const { code, payload } = await ajaxGet('blog.x.json');
			if(code === 0) {
				return payload.blog;
			} else {
				return []
			}
		default:
			return state
	}
}

export default blogStore