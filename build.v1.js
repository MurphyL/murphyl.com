const fs = require('fs');
const path = require('path');
const toml = require('toml');
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

// 生产文章数据
const postTarget = 'public/post';
if (!fs.existsSync(postTarget)) {
	fs.mkdirSync(postTarget);
}

const posts = (fs.readdirSync('blog') || [])
	.filter((filename) => {
		return /^20\d\d-\d\d-[0-3]\d/.test(filename) && filename.endsWith('.md')
	})
	.map((filename) => {
		// 文章绝对路径
		const path = reslovePath(`blog/${filename}`);
		// 文章正文内容
		const source = resloveFile(path);
		// 文章元数据
		const parsed = parseFrontMatter(source) || {};
		return { 
			filename,
			meta: parsed.data || {},
			markdown: trimIfString(parsed.content) || ''
		};
	})
	.filter((item) => {
		const filename= item.filename.replace(/\.md$/, '.json');
		writeFile(`public/post/${filename}`, JSON.stringify(item))
		return !item.meta.achived && !item.meta.hidden;
	})
	.sort((a, b) => {
        return -a.filename.localeCompare(b.filename)
    });

// 写入数据文件
writeFile('public/blog.json', JSON.stringify(posts));

// 写入原始数据
writeFile('public/murph.json', JSON.stringify({
	timestamp: parseInt(Date.now() / 1000),
}));