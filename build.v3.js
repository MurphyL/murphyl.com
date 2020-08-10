const fs = require('fs');
const del = require('del');
const path = require('path');
const toml = require('toml');
const moment = require('moment');
const shortid = require('shortid');
const parseFrontMatter = require('frontmatter');
const { src, dest, series } = require('gulp');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const clean = async () => {
	del.sync([
		'build/',
		'public/blog.x.json'
	]);
	// fs.mkdirSync('public/posts/');
};

// 通过文件名称判断是否为Markdown文件
const isMarkdownFile = (filename) => (filename && filename.endsWith('.md'));

// 解析当前目录下的路径
const reslovePath = (suffix) => path.join(process.cwd(), suffix);

// 读取文件内容
const resloveFile = (filepath) => fs.readFileSync(filepath, 'utf8').toString().trim();

// 如果是字符串就Trim当前字符串
const trimIfString = (source) => (typeof(source) ==='string' ? source.trim() : source);

// 抽取文章摘要
const extractSummary = (text) => {
    return trimIfString((text || '').split(/<!(-{2,})( *)more( *)(-{2,})>/)[0]) || '';
};

// 内容写入文件
const writeFile = (suffix, content) => {
	const writeTarget = path.join(process.cwd(), suffix);
	fs.writeFileSync(writeTarget, Buffer.from(content));
};

// 处理配置文件
const manifest = async () => {
	const configSource = resloveFile(reslovePath('config.toml'));
	const { manifest } = toml.parse(configSource);
	writeFile('public/manifest.json', JSON.stringify(manifest, null, '\t'), true);
}


const blog = async () => {
	const db = low(new FileSync('public/blog.x.json'));
	db.defaults({ blog: [] }).write()
	const items = [];
	(fs.readdirSync('blog') || []).filter((filename) => {
		return /^20\d\d\d\d[0-3]\d/.test(filename) && isMarkdownFile(filename)
	}).sort((a, b) => {
	    return -a.localeCompare(b)
	}).forEach((filename) => {
		// 文章绝对路径
		const path = reslovePath(`blog/${filename}`);
		// 文章正文内容
		const source = resloveFile(path);
		// 文章元数据
		const parsed = parseFrontMatter(source) || {};
		// 正文
		const markdown = trimIfString(parsed.content) || '';
		db.get('blog').push({
			filename,
			markdown,
			id: shortid.generate(),
			meta: (parsed.data || {}),
			title: (parsed.data || {}).title,
			summary: extractSummary(markdown || ''),
		}).write()
	});
};

const funDeps = async () => {
	const blog = resloveFile('public/blog.x.json');
	writeFile('api/blog.x.js', 'export default ' + blog);
};

exports.default = series(clean, manifest, blog, funDeps);