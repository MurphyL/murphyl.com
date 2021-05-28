const fs = require('fs');
const path = require('path');
const toml = require('toml');
const yaml = require('yaml');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const resolvePath = (filepath) => path.resolve(__dirname, filepath);

const readFileSync = (filepath) => fs.readFileSync(filepath).toString();

const parseTomlFile = (filepath) => toml.parse(readFileSync(filepath));

const parseYamlFile = (filepath) => yaml.parse(readFileSync(filepath));

const toml2json = (source, target) => {
    fs.writeFileSync(target, JSON.stringify(parseTomlFile(source)));
};

const yaml2json = (source, target) => {
    fs.writeFileSync(target, JSON.stringify(parseYamlFile(source)));
};

const TARGET_DOC_ROOT = resolvePath('../public/docs');

rimraf.sync(TARGET_DOC_ROOT);

mkdirp.sync(path.join(TARGET_DOC_ROOT, 'markdown'));

toml2json(resolvePath('docs/meta.toml'), resolvePath('../public/docs/meta.json'));
yaml2json(resolvePath('yaml/docs.yaml'), resolvePath('../public/docs/build.json'));