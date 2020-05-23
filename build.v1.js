const fs = require('fs');
const path = require('path');
const toml = require('toml');
const moment = require('moment');
const parseFrontMatter = require('frontmatter');

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

// 处理配置文件
const configSource = resloveFile(reslovePath('config.toml'));
const { manifest } = toml.parse(configSource);
writeFile('public/manifest.json', JSON.stringify(manifest, null, '\t'));

const time = moment().format('YYYY/MM/DD HH:mm:ss');;

const local = {
	time,
	dict: {},
	blog: [],
	docs: []
};

// 博客 - 先不抽象
(fs.readdirSync('blog') || []).filter((filename) => {
	return /^20\d\d-\d\d-[0-3]\d/.test(filename) && filename.endsWith('.md')
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
	local.dict[filename] = { 
		filename,
		kind: 'blog',
		...(parsed.data || {}),
		markdown: trimIfString(parsed.content) || ''
	};
	const { achive, hidden } = parsed.data || {};
	// achive and hidden
	if(!achive && !hidden) {
		local.blog.push(filename);
	};
});

// 文档
(fs.readdirSync('docs') || []).filter((filename) => {
	return filename.endsWith('.md')
}).forEach((filename) => {
	// 文章绝对路径
	const path = reslovePath(`docs/${filename}`);
	// 文章正文内容
	const source = resloveFile(path);
	// 文章元数据
	const parsed = parseFrontMatter(source) || {};
	// index
	local.docs.push(filename);
	// source
	local.dict[filename] = { 
		filename,
		kind: 'document',
		...(parsed.data || {}),
		markdown: trimIfString(parsed.content) || ''
	};
});

// 写入数据文件
writeFile('public/coffee.json', JSON.stringify(local));
