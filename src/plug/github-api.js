import axios from 'axios';

import { selectorFamily } from 'recoil';

import { get as pathGet } from 'object-path';

const instance = axios.create({
    baseURL: import.meta.env.VITE_GH_ENDPOINT,
    timeout: 10000
});

const extract = ({ status, data = {} }, path) => {
    const success = status === 200 && !data.errors && data.data;
    return [success, success ? pathGet(data, path) : '查询出错', data.errors];
};

const REPO_QUERY = 'repository(owner:$gh_login, name:$repository)';

const ISSUE_LIST_QUERY = 'issues(labels:$post_labels, states:$post_states, after:$start_cursor, first:10, orderBy:{field:UPDATED_AT, direction:DESC})';

const ISSUE_ITEM_QUERY = 'issue(number:$issue_number)';

const PAGE_FIELDS = 'totalCount, pageInfo { startCursor, endCursor, hasNextPage, hasPreviousPage }';

const ISSUE_FIELDS = 'id, number, title, bodyText, createdAt, labels(first: 10) { nodes { id, name, color, description } }, author { login, url, avatarUrl, resourcePath }';

export const fetchIssueList = selectorFamily({
    key: 'fetch-issues-list-v1',
    get: (params) => async () => {
        const result = await instance.post('', {
            query: `query($gh_login:String!, $repository:String!, $post_labels:[String!]!, $post_states:[IssueState!], $start_cursor:String) { ${REPO_QUERY} { ${ISSUE_LIST_QUERY} { ${PAGE_FIELDS}, nodes { ${ISSUE_FIELDS} } } } }`,
            variables: {
                gh_login: import.meta.env.VITE_GH_USERNAME,
                repository: import.meta.env.VITE_GH_REPOSITORY,
                post_labels: import.meta.env.VITE_GH_POST_LABELS.split(','),
                post_states: import.meta.env.PROD ? ['CLOSED'] : ['CLOSED', 'OPEN'],
                start_cursor: params.startCursor,
            }
        });
        return extract(result, 'data.repository.issues');
    },
});

export const getIssueDetails = selectorFamily({
    key: 'get-issue-details-v1',
    get: (issue_number) => async () => {
        const result = await instance.post('', {
            query: `query($gh_login:String!, $repository:String!, $issue_number:Int!) { ${REPO_QUERY} { ${ISSUE_ITEM_QUERY} { ${ISSUE_FIELDS} } } }`,
            variables: {
                gh_login: import.meta.env.VITE_GH_USERNAME,
                repository: import.meta.env.VITE_GH_REPOSITORY,
                issue_number: parseInt(issue_number),
            }
        });
        return extract(result, 'data.repository.issue');
    },
});



export const greeting = async () => {
    const resp = await instance.get();
    console.log(resp);
};