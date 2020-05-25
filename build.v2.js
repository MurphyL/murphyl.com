const fs = require('fs');
const del = require('del');
const path = require('path');
const toml = require('toml');
const moment = require('moment');
const parseFrontMatter = require('frontmatter');
const { src, dest, parallel, series } = require('gulp');

const clean = async () => {
	del([ 
		'public/posts/*',
	]);
};

// 解析当前目录下的路径
const reslovePath = (suffix) => path.join(process.cwd(), suffix);

// 读取文件内容
const resloveFile = (filepath) => fs.readFileSync(filepath, 'utf8').toString().trim();

// 内容写入文件
const writeFile = (suffix, content) => {
	const writeTarget = path.join(process.cwd(), suffix);
	fs.writeFile(writeTarget, Buffer.from(content), (err) => {
		if(err){
			console.error(suffix, '数据写入失败');
		} else {
			console.log(suffix, '数据写入完成');
		}
	});
}

// 如果是字符串就Trim当前字符串
const trimIfString = (source) => (typeof(source) ==='string' ? source.trim() : source);

// 通过文件名称判断是否为Markdown文件
const isMarkdownFile = (filename) => (filename && filename.endsWith('.md'));

// 抽取文章摘要
const extractSummary = (text) => {
    return trimIfString((text || '').split(/<!(-{2,})( *)more( *)(-{2,})>/)[0]) || '';
};

const manifest = async () => {
	// 处理配置文件
	const configSource = resloveFile(reslovePath('config.toml'));
	const { manifest } = toml.parse(configSource);
	writeFile('public/manifest.json', JSON.stringify(manifest, null, '\t'));
}

const copy = async () => {
	if(!fs.existsSync('public/posts/')) {
		fs.mkdirSync('public/posts/');
	}
	src([ 'blog/*.md', 'docs/*.md' ]).pipe(dest('public/posts/'));
};

const blog = async () => {
	const items = [];
	(fs.readdirSync('blog') || []).filter((filename) => {
		return /^20\d\d-\d\d-[0-3]\d/.test(filename) && isMarkdownFile(filename)
	}).sort((a, b) => {
	    return -a.localeCompare(b)
	}).forEach((filename) => {
		// 文章绝对路径
		const path = reslovePath(`blog/${filename}`);
		// 文章正文内容
		const source = resloveFile(path);
		// 文章元数据
		const parsed = parseFrontMatter(source) || {};
		// source
		const { achive, hidden } = parsed.data || {};
		// achive and hidden
		if(!achive && !hidden) {
			items.push({
				filename,
				kind: 'blog',
				...(parsed.data || {}),
				summary: extractSummary(trimIfString(parsed.content) || '')
			});
		};
	});
	writeFile('public/blog.json', JSON.stringify(items));
}

const docs = async () => {
	const items = [];
	(fs.readdirSync('docs') || []).filter(isMarkdownFile).forEach((filename) => {
		// 文章绝对路径
		const path = reslovePath(`docs/${filename}`);
		// 文章正文内容
		const source = resloveFile(path);
		// 文章元数据
		const parsed = parseFrontMatter(source) || {};
		items.push({ 
			filename,
			kind: 'document',
			...(parsed.data || {})
		});
	});
	writeFile('public/docs.json', JSON.stringify(items));
}

const build = parallel(manifest, copy, blog, docs);

exports.default = series(clean, build);