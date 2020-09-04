const fs = require('fs');
const del = require('del');
const path = require('path');
const moment = require('moment');
const shortid = require('shortid');
const { xml2js } = require('xml-js');
const { src, dest, series } = require('gulp');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const clean = async () => {
	del.sync([
		'build/',
		'public/murph.x.json',
		'public/graphql.json',
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
	const db = low(new FileSync('public/manifest.json'));
	db.defaults(murph.manifest || {}).write();
};

const graphql = async () => {
	const content = resloveFile(reslovePath('graphql.xml'));
	const xml = xml2js(content);
	if(!xml) {
		return console.log('XML文件为空');
	}
	const [ mapper ] = xml.elements || [];
	if(!mapper) {
		return console.log('XML文件为空');
	}
	const mapping = {};
	const items = (mapper.elements || []).forEach(({ name, attributes, elements }) => {
		if(name !== 'graphql' || !elements || elements.length === 0) {
			return;
		}
		const [ element = {} ] = elements;
		if(!attributes || !attributes.id) {
			return console.log('查询语句的ID未设置');
		}
		mapping[attributes.id] = trimIfString(element.cdata);
	});
	writeFile('public/graphql.json', JSON.stringify(mapping, null, '\t'));
};

exports.default = series(clean, manifest, graphql);