import { useRouter } from 'next/router';

import FileUtils from '../../utils/FileUtils.js';
import BlogUtils from '../../utils/BlogUtils';

import PostList from '../../includes/layout/PostList.jsx';

const DATE_PATTERN = /20\d\d-\d\d-[0-3]\d/;

export async function getStaticProps() {
	// 获取文章列表（包含文章内容）
	const posts = FileUtils.listBlog(true) || [];
	posts.forEach((item, index) => {
		item.index = index;
		// 匹配日期字串
		const datePatternMatcher = item.filename.match(DATE_PATTERN);
		// 构造日期元数据
		if(datePatternMatcher) {
			const date = new Date(datePatternMatcher[0]);
			item.date = date.getDate();
			item.month = (date.getMonth() + 1);
			item.year = date.getFullYear();
		}
		// 解析文章元数据
		const parsed = BlogUtils.reslovePostMeta(item.source || '') || {};
		Object.assign(item, parsed);
		// 删除未解析的部分
		delete item.source;
	});
	return {
		props: {
			title: '博客 - 归档',
			posts: posts || [],
		}
	}
}

/**
 * 过滤数组元素
 */
const getEffectiveItem = (raw) => {
	const items = Array.isArray(raw) ? raw : [ raw ];
	return items.filter(item => (item && item.trim().length > 0))
}

/**
 * converter 为2层K/V结构，每一个Key对应一个搜索关键字
 * converter - 字段定义：
 *	- readParam：解析参数值
 *	- readValue：解析文章元数据
 *	- converter：校验文章元数据是否和搜索关键字匹配
 */

const PARAMS_CONFIG = {
	year: {
		readParam: ({ year }) => parseInt(year)
	},
	month: {
		readParam: ({ month }) => parseInt(month)
	},
	date: {
		readParam: ({ date }) => parseInt(date)
	},
	author: {
		readValue: (item) => (item.meta || {}).author,
		readParam: (query) => getEffectiveItem(query.author),
		validator: (author, searchAuthors) => {
			if(!searchAuthors || searchAuthors.length ===0) {
				return false;
			}
			return (searchAuthors || []).map(author => author.toLowerCase()).includes(author)
		}
	},
	keyword: {
		readValue: (item) => item,
		readParam: (query) => getEffectiveItem(query.keyword),
		validator: (item, keywords) => {
			for(let i in keywords) {
				const keyword = (keywords[i] || '').toLowerCase();
				if(item.filename.toLowerCase().indexOf(keyword) >= 0) {
					return true;
				}
				if((item.meta.title || '').toLowerCase().indexOf(keyword) >= 0) {
					return true;
				}
				const tags = ((item.meta || {}).tags || []).map(tag => tag.toLowerCase());
				if(tags.includes(keyword)) {
					return true;
				}
			}
			return false;
		}
	}
};

export default function Achive({ posts }) {
	const router = useRouter();
	const params = router.query;
	const items = (posts || {}).filter(source => {
		for(let key in params) {
			const config = PARAMS_CONFIG[key];
			if(!config || !params[key]) {
				return false;
			}
			const value = config.readValue ? config.readValue(source) : source[key];
			const param = config.readParam ? config.readParam(params) : params[key];
			if(config.validator) {
				return config.validator(value, param);
			}
			if(source[key] !== param) {
				return false;
			}
		}
		return true;
	}).map(({ filename }) => filename);
	return (
		<PostList config={ { params, count: items.length, items } } />
	)
}