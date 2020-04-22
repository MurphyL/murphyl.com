import FileUtils from '../../utils/FileUtils.js';
import BlogUtils from '../../utils/BlogUtils';

import PostItem from '../../includes/layout/PostItem.jsx';

export async function getStaticPaths() {
	const paths = FileUtils.listBlog().map(({ filename }) => {
		return `/blog/${filename}`
	});
	return { paths, fallback: false }
}

// 在构建时也会被调用
export async function getStaticProps({ params }) {
	const { unique } = params;
	const content = FileUtils.readBlogFile(unique);
	const parsed = BlogUtils.reslovePostMeta(content || '') || {};
	const { meta = {}, markdown = '' } = parsed;
	return { 
		props: { params, meta, markdown, title: meta.title } 
	}
}

export default function Post({ markdown, meta }) {
	return (
		<PostItem meta={ meta } markdown={ markdown } />
	)
}