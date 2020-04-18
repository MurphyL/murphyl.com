import fs from 'fs';
import path from 'path';

import PostItem from '../../layout/PostItem.jsx';

export async function getStaticPaths() {
	const root = path.join(process.cwd(), 'blog');
	if(fs.existsSync(root)) {
		const paths = (fs.readdirSync(root) || []).map((filename) => {
			return `/blog/${filename}`
		});
		return { paths, fallback: false }
	}
}

// 在构建时也会被调用
export async function getStaticProps({ params }) {
	return { props: { params } }
}

export default function Post({ params }) {
	return (
		<PostItem config={params} />
	)
}