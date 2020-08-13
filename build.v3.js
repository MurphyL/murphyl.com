const fs = require('fs');
const del = require('del');
const path = require('path');
const moment = require('moment');
const shortid = require('shortid');
const { src, dest, series } = require('gulp');
const parseFrontMatter = require('frontmatter');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const clean = async () => {
	del.sync([
		'build/',
		'public/murph.x.json',
		'public/manifest.json',
	]);
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

// 配置文件
const murph = JSON.parse(resloveFile(reslovePath('murph.json')));

// 处理配置文件
const manifest = async () => {
	const manifest = JSON.stringify((murph.manifest || {}), null, '\t');
	writeFile('public/manifest.json', manifest, true);
}


const blog = async () => {
	const db = low(new FileSync('public/murph.x.json'));
	const dt = new Date().toLocaleDateString('zh-CN');
	const ts = new Date().toLocaleTimeString('en-US', { hour12: false });
	db.defaults(Object.assign(murph)).write();
	db.unset('manifest').write();
	db.set('app.version', `${dt} ${ts}`).write();
	const items = [];
	const blogCollection = db.get('blog');
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
		// 写入数据
		blogCollection.push({
			filename,
			markdown,
			...(parsed.data || {}),
			id: shortid.generate(),
			summary: extractSummary(markdown || ''),
		}).write()
	});
};

exports.default = series(clean, manifest, blog);