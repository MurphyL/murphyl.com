import { useContext } from 'react';
import { selectorFamily } from 'recoil';

import axios from 'axios';
import TOML from '@iarna/toml';

import { JSONPath } from 'jsonpath-plus-browser';

import { MapperContext } from 'plug/extra/x-context';

import { Error } from 'plug/extra/status/status.module';

export const fetchGraphQlMapper = selectorFamily({
    key: 'fetch-graphql',
    get: () => async () => {
        const { data, status } = await axios.get('/graphql.toml');
        if (status === 200) {
            return TOML.parse(data);
        } else {
            return null;
        }
    }
});

export const callGithubAPI = selectorFamily({
    key: 'call-github-api-v4',
    get: ({ key, path, ...extra }) => () => {
        const { graphql: mapper } = useContext(MapperContext);
        const graphql = mapper[key];
        if (!graphql) {
            throw new Error('查询语句为空！');
        }
        return axios.post('https://api.github.com/graphql', {
            query: graphql,
            graphql: key,
            variables: {
                ghp_username: process.env.REACT_APP_GHP_USERNAME,
                ghp_repository: process.env.REACT_APP_GHP_REPOSITORY,
                ghp_issue_states: (process.env.REACT_APP_GHP_ISSUE_STATES || 'CLOSED').split(','),
                ...extra,
            }
        }, {
            headers: {
                Authorization: `bearer ${process.env.REACT_APP_GHP_TOKEN}`,
            }
        }).then(({ status, data }) => {
            return status === 200 ? (path ? JSONPath({json: data, path, wrap: false}) : data) : null;
        }).catch(err => {
            console.error('Github API 调用出错：', err.message);
            return null;
        }).finally(() => {
            console.log('Github API 调用完成！');
        });
    }
});
