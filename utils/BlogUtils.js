import parseFrontMatter from 'frontmatter';

import ObjectUtils from './ObjectUtils';

const reslovePostMeta = function(text) {
	const parsed = parseFrontMatter(text) || {};
	ObjectUtils.fillEmptyValue(parsed, 'data', {});
	ObjectUtils.fillEmptyValue(parsed, 'content', '');
	ObjectUtils.renameObjectKey(parsed, 'data', 'meta');
	ObjectUtils.renameObjectKey(parsed, 'content', 'markdown');
	return parsed;
};

/** 
 * 提取文章正文的摘要部分
 * @params text： markdown正文
 */
const extractSummary = function(text) {
	return (text || '').split(/<!(-{2,})( *)more( *)(-{2,})>/)[0];
};


export default {
	reslovePostMeta,
	extractSummary
};
