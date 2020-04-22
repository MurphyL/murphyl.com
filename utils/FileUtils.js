import fs from 'fs';
import path from 'path';

const listFiles = function(suffix, withContent = false) {
	const root = path.join(process.cwd(), suffix);
	if(!fs.existsSync(root)) {
		return [];
	}
	return (fs.readdirSync(root) || [])
		// 仅保留md文件
		.filter(filename => filename.endsWith('.md'))
		.map(filename => {
			const item = { filename };
			if(withContent) {
				const filepath = path.join(root, filename);
				const stream = fs.readFileSync(filepath, 'utf8');
				if(stream) {
					item.source = stream.toString().trim();	
				}
			}
			return item;
		});
};

const readFile = function(target) {
	const filepath = path.join(process.cwd(), target);
	return fs.readFileSync(filepath, 'utf8').toString().trim();	
}

const mapPatterns = function(pattern, filter) {
	const paths = [];
	const items = listFiles('blog', false).forEach(({ filename }) => {
		const matched = filename.match(pattern)
		if(matched) {
			paths.push(matched[0]);
		}
	});
	return paths;
};

export default {
	mapPatterns,
	readBlogFile: (unique) => readFile(`/blog/${unique}`),
	listDocs: (withContent = false) => listFiles('docs', withContent),
	listBlog: (withContent = false) => listFiles('blog', withContent),
};
