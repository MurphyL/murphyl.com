import { useRecoilValue, selectorFamily } from 'recoil';

import axios from 'axios';

import { useJSONPath, useMetaInfo } from 'plug/hooks';

const PREPARED_GRAPHQL = useMetaInfo('src/data/toml/graphql.toml') || {};

const ajax = axios.create({
    baseURL: 'https://api.github.com/graphql',
    timeout: 10000,
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GHP_TOKEN}`,
    }
});

const GHP_VARS = {
    ghp_username: process.env.REACT_APP_GHP_USERNAME,
    ghp_repository: process.env.REACT_APP_GHP_REPOSITORY,
};

const callGithubAPI = selectorFamily({
    key: 'call-github-api-v4',
    get: ({ key, path, ...extra }) => () => {
        const graphql = PREPARED_GRAPHQL[key];
        if (!graphql) {
            throw new Error('查询语句为空！');
        }
        return ajax.post('', {
            query: graphql,
            variables: Object.assign(GHP_VARS, {
                ghp_issue_states: (process.env.REACT_APP_GHP_ISSUE_STATES || 'CLOSED').split(','),
            }, extra)
        }).then(({ status, data }) => {
            return status === 200 ? (path ? useJSONPath(data, path) : data) : null;
        }).catch(err => {
            console.error('Github API 调用出错：', err.message);
            return null;
        }).finally(() => {
            console.log('Github API 调用完成！');
        });
    }
});

export const useIssueList = (label) => {
    return useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: label,
        path: '$.data.repository.issues.nodes'
    }));
};

export const useIssueComments = (label) => {
    return useRecoilValue(callGithubAPI({
        key: 'query-issue-comments',
        ghp_labels: label,
        path: '$.data.repository.issues.nodes'
    }));
};

export const useIssueDetails = (unique) => {
    return useRecoilValue(callGithubAPI({
        key: 'get-issue-details',
        issue_number: parseInt(unique),
        path: '$.data.repository.issue'
    }));
};
