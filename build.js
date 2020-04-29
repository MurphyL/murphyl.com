const fs = require('fs');
const path = require('path');
const toml = require('toml');
const parseFrontMatter = require('frontmatter');

const trimIfString = (source) => (typeof(source) ==='string' ? source.trim() : source);

const renameObjectKey = function(target, oldName, newName) {
	if(target === null || target === undefined) {
		return;
	}
	target[newName] = trimIfString(target[oldName]);
	delete target[oldName];
};

const fillEmptyValue = function(target, field, value) {
	if(target === null || target === undefined || field === null || field === undefined) {
		return;
	}
	if(target[field] === null || target[field] === undefined) {
		target[field] = value;	
	}
};

const configPath = path.join(process.cwd(), 'config.toml');

if(fs.existsSync(configPath)) {
	const configSource = fs.readFileSync(configPath, 'utf8').toString().trim();
	const { manifest } = toml.parse(configSource);
	console.log(JSON.stringify(manifest, null, '\t'));
	const configTarget = path.join(process.cwd(), 'public/manifest.json');
	fs.writeFile(configTarget, Buffer.from(JSON.stringify(manifest, null, '\t')), (err) => {
		if(err){
			console.log('manifest.json', '数据写入失败');
		} else {
			console.log('manifest.json', '数据写入完成');
		}
	});
}

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

/** 
 * 提取文章正文的摘要部分
 * @params text： markdown正文
 */
const extractSummary = function(text) {
	return (text || '').split(/<!(-{2,})( *)more( *)(-{2,})>/)[0];
};

const kind = process.argv[2];

const DATE_PATTERN = /20\d\d-\d\d-[0-3]\d/;

console.log(kind, '正在生成数据~');

switch (kind) {
    case 'blog':
		if (!fs.existsSync('public/post')) {
			fs.mkdirSync('public/post');
		}
        const blogItems = listFiles('blog', true).map(item => {
            const parsed = parseFrontMatter(item.source) || {};
            fillEmptyValue(parsed, 'data', {});
            fillEmptyValue(parsed, 'content', '');
            renameObjectKey(parsed, 'data', 'meta');
            renameObjectKey(parsed, 'content', 'markdown');
			delete item.source;
			// 匹配日期字串
			const datePatternMatcher = item.filename.match(DATE_PATTERN);
			// 构造日期元数据
			if(datePatternMatcher) {
				const date = new Date(datePatternMatcher[0]);
				parsed.meta.date = date.getDate();
				parsed.meta.month = (date.getMonth() + 1);
				parsed.meta.year = date.getFullYear();
			}
			const summary = trimIfString(extractSummary(parsed.markdown));
            Object.assign(item, parsed, {
                summary
			})
			const post = path.join(process.cwd(), `public/post/${item.filename}.json`);
        	fs.writeFile(post, Buffer.from(JSON.stringify(item)), (err) => {
				if(err){
					console.log(item.filename, '数据写入失败');
				} else {
					console.log(item.filename, '数据写入完成');
				}
			});
			return item;
        }).sort((a, b) => {
            return -a.filename.localeCompare(b.filename)
        });
        const target = path.join(process.cwd(), 'public/blog.json');
        fs.writeFile(target, Buffer.from(JSON.stringify(blogItems)), (err) => {
			if(err){
				console.log('blog.json', '数据写入失败');
			} else {
				console.log('blog.json', '数据写入完成');
			}
		});
        break;
    default:
        console.log('啥也没做');
}

console.log(kind, '数据已写入文件！');
