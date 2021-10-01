import React from 'react';
import axios from 'axios';
import TOML from '@iarna/toml';
import { xml2js } from 'xml-js';
import * as matter from 'gray-matter';

import { selectorFamily } from 'recoil';

import { Error } from 'plug/include/status/status.module.jsx';

export const resolveToml = (promise, label = '') => {
    return promise.then(({ status, data }) => {
        return (status === 200) ? TOML.parse(data) : { loading: <Error message={`请求${label}数据出错`} /> };
    }).catch(err => {
        console.log('调用后端接口出错：', err.message);
        return { loading: <Error message={`请求${label}数据出错，调用接口出错`} /> };
    });
};

export const resolveMarkdown = (promise, label = '') => {
    return promise.then(({ status, data }) => {
        if (status === 200) {
            const { data: meta, content } = matter(data);
            return { meta, content };
        } else {
            return { loading: <Error message={`请求${label}数据出错`} /> };
        }
    }).catch(err => {
        console.log('调用后端接口出错：', err.message);
        return { loading: <Error message={`请求${label}数据出错，调用接口出错`} /> };
    });
};

export const parseXML = (data = '') => {
    return xml2js(data, {
        compact: true,
        ignoreComment: true,
        ignoreDeclaration: true
    });
};

export const parseTOML = (data = '') => {
    return TOML.parse(data);
};

export const fetchGraphQlMapper = selectorFamily({
    key: 'fetch-graphql',
    get: () => async () => {
        const { data, status } = await axios.get('/data/github.graphql.xml');
        if (status === 200) {
            const { graphql } = parseXML(data);
            return graphql;
        } else {
            return null;
        }
    }
});

export const callGithubAPI = selectorFamily({
    key: 'call-github-api-v4',
    get: ({ graphql, tags }) => () => axios.post('https://api.github.com/graphql', {
        query: graphql,
        variables: {
            ghp_username: process.env.REACT_APP_GHP_USERNAME,
            ghp_repository: process.env.REACT_APP_GHP_REPOSITORY,
            ghp_labels: tags || [],
        }
    }, {
        headers: {
            Authorization: `bearer ${process.env.REACT_APP_GHP_TOKEN}`
        }
    }).then(({ status, data }) => {
        return status === 200 ? data : null;
    }).catch(err => {
        return null;
    }).finally(() => {
        console.log('Github API 调用完成！');
    })
});
