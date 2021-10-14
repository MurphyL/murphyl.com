import React, { useContext } from 'react';
import { selectorFamily } from 'recoil';

import axios from 'axios';
import TOML from '@iarna/toml';

import { get as pathGet } from 'object-path';

import * as matter from 'gray-matter';

import MapperContext from 'plug/extra/mepper_context.jsx';

import { Error } from 'plug/extra/status/status.module.jsx';

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

export const parseTOML = (data = '') => {
    return TOML.parse(data);
};

export const parseMarkdown = (data = '') => {
    const { data: meta, excerpt, content } = matter(data, {
        excerpt: true,
        language: 'toml',
        delims: ['```', '```'],
        excerpt_separator: '<!-- more -->',
        engines: {
            toml: TOML.parse.bind(TOML),
        }
    });
    return { meta, excerpt, content };
};

export const fetchGraphQlMapper = selectorFamily({
    key: 'fetch-graphql',
    get: () => async () => {
        const { data, status } = await axios.get('/graphql.toml');
        if (status === 200) {
            return parseTOML(data);
        } else {
            return null;
        }
    }
});

export const callGithubAPI = selectorFamily({
    key: 'call-github-api-v4',
    get: ({ key, path, ...extra }) => () => {
        const mapper = useContext(MapperContext);
        const graphql = mapper[key];
        if (!graphql) {
            throw new Error('查询语句为空！');
        }
        return axios.post('https://api.github.com/graphql', {
            query: graphql,
            variables: {
                ghp_username: process.env.REACT_APP_GHP_USERNAME,
                ghp_repository: process.env.REACT_APP_GHP_REPOSITORY,
                ghp_issue_states: (process.env.REACT_APP_GHP_ISSUE_STATES || 'CLOSED').split(','),
                ...extra,
            }
        }, {
            headers: {
                Authorization: `bearer ${process.env.REACT_APP_GHP_TOKEN}`
            }
        }).then(({ status, data }) => {
            return status === 200 ? (path ? pathGet(data, path) : data) : null;
        }).catch(err => {
            console.error('Github API 调用出错：', err.message);
            return null;
        }).finally(() => {
            console.log('Github API 调用完成！');
        });
    }
});
