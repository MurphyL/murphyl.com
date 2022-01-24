import { useRecoilValue, selectorFamily } from 'recoil';

import axios from 'axios';

import { useJSONPath, useMetaInfo } from 'plug/hooks';

const GRAPHQL_UNIQUE = 'src/data/toml/graphql.toml';

const ajax = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 10000,
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GHP_TOKEN}`,
    }
});

const GPV4_VARS = {
    ghp_username: process.env.REACT_APP_GHP_USERNAME,
    ghp_repository: process.env.REACT_APP_GHP_REPOSITORY,
    ghp_issue_states: (process.env.REACT_APP_GHP_ISSUE_STATES || 'CLOSED').split(','),
};

const callGithubV4API = selectorFamily({
    key: 'call-github-api-v4',
    get: ({ graphql, ...extra }) => () => {
        if (!graphql) {
            throw new Error('查询语句为空！');
        }
        return ajax.post('/graphql', {
            query: graphql,
            variables: Object.assign({}, GPV4_VARS, extra)
        }).then(({ status, data }) => {
            return status === 200 ? data : null;
        }).catch(err => {
            console.error('Github API 调用出错：', err.message);
            return null;
        }).finally(() => {
            console.log('Github API 调用完成！');
        });
    }
});

export const useIssueList = (label) => {
    const prepared = useMetaInfo(GRAPHQL_UNIQUE) || {};
    const result = useRecoilValue(callGithubV4API({
        graphql: prepared['query-issue-list'],
        ghp_labels: label,
    }));
    // path: '$.data.repository.issues.nodes'
    return useJSONPath(result, '$.data.repository.issues.nodes');
};

export const useIssueComments = (label) => {
    const prepared = useMetaInfo(GRAPHQL_UNIQUE) || {};
    const result = useRecoilValue(callGithubV4API({
        graphql: prepared['query-issue-comments'],
        ghp_labels: label,
    }));
    // path: '$.data.repository.issues.nodes'
    return useJSONPath(result, '$.data.repository.issues.nodes');
};

export const useIssueDetails = (unique) => {
    const prepared = useMetaInfo(GRAPHQL_UNIQUE) || {};
    const result = useRecoilValue(callGithubV4API({
        graphql: prepared['get-issue-details'],
        issue_number: parseInt(unique),
    }));
    // path: '$.data.repository.issue'
    return useJSONPath(result, '$.data.repository.issue');
};
