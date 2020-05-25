const fs = require('fs-extra');
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

/**
 * 抽取文章摘要
 */
const extractSummary = (text) => {
    return trimIfString((text || '').split(/<!(-{2,})( *)more( *)(-{2,})>/)[0]) || '';
};

const isMarkdownFile = (filename) => (filename && filename.endsWith('.md'));

const blog = [];
const docs = [];

// 博客 - 先不抽象
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
		blog.push({
			filename,
			kind: 'blog',
			...(parsed.data || {}),
			summary: extractSummary(trimIfString(parsed.content) || '')
		});
	};
});

// 文档
(fs.readdirSync('docs') || []).filter(isMarkdownFile).forEach((filename) => {
	// 文章绝对路径
	const path = reslovePath(`docs/${filename}`);
	// 文章正文内容
	const source = resloveFile(path);
	// 文章元数据
	const parsed = parseFrontMatter(source) || {};
	docs.push({ 
		filename,
		kind: 'document',
		...(parsed.data || {})
	});
});

const time = moment().format('YYYY/MM/DD HH:mm:ss');;



if(fs.existsSync('public/posts')) {
	fs.remove(`public/posts`);
}

const copyDir = (sourceDir, targetDir) => {
	fs.copy(sourceDir, targetDir, (err) => {
		if(err) {
			console.log(`${sourceDir}文件拷贝失败`, err);
		} else {
			console.log(`${sourceDir}文件拷贝完成`);	
		}
	})
}

const publish = (kind, items) => {
	const dist = `public/${kind}.json`;
	if(fs.existsSync(dist)) {
		fs.unlinkSync(dist);
	}
	copyDir(kind, 'public/posts');
	// 写入数据文件
	writeFile(`public/${kind}.json`, JSON.stringify(items));

}

publish('blog', blog);
publish('docs', docs);
