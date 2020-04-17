import fs from 'fs';
import path from 'path';

import PostList from '../../../layout/PostList.jsx';


const YEAR_PATTERN = /\d\d\d\d/;

export async function getStaticPaths() {
	const root = path.join(process.cwd(), 'blog');
	const paths = [];
	if(fs.existsSync(root)) {
		const filenames = fs.readdirSync(root) || [];
		filenames.forEach((filename) => {
			const matched = filename.match(YEAR_PATTERN)
			if(matched) {
				paths.push(`/blog/year/${matched[0]}`)
			}
		});
	}
	return { paths, fallback: false }
}

// 在构建时也会被调用
export async function getStaticProps({ params }) {
	return { props: { params } }
}

export default function Post({ params }) {
	return (
		<PostList config={ params } />
	)
}