const fs   = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const load = (location) => {
    const target = path.resolve(__dirname, location);
    return yaml.safeLoad(fs.readFileSync(target, 'utf8'));
};

const remove = (location, callback) => {
    fs.unlink(path.resolve(__dirname, location), callback)
};

const write = (location, data) => {
    fs.writeFile(path.resolve(__dirname, location), data, (e) => {
        e && console.log('File wroted:', e);
    })
};

const config = load('../_config.yml');

const { theme, theme_override = false } = config;

if(theme_override) {
    console.log('覆盖当前主题的配置', theme, theme_override);

    const localConfig = load(`../source/_data/${theme}.yml`);
    const themeConfig = load(`../themes/${theme}/_config.yml`);
    const result = Object.assign(themeConfig, localConfig);

    remove(`../themes/${theme}/_config.yml`, (e) => {
        e && console.log('remove theme config: ', e);
    });

    write(`../themes/${theme}/_config.yml`, yaml.safeDump(result))

    // console.log('--------')
    // console.log(yaml.safeDump(result));

    return;
}


