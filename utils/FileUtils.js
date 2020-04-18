import fs from 'fs';
import path from 'path';

const listFiles = function(suffix, withContent = false) {
	const root = path.join(process.cwd(), suffix);
	if(!fs.existsSync(root)) {
		return [];
	}
	return (fs.readdirSync(root) || []).map(filename => {
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
	listBlogs: (withContent = false) => listFiles('blog', withContent),
};
