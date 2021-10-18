import React, { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { Link, useParams } from "react-router-dom";

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

import { MarkdownViewerV1, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './topic-v2.module.css';

const params = {
    key: 'query-issue-comments',
    ghp_labels: 'X-TOPIC',
    path: 'data.repository.issues.nodes'
};

const get = (rows, group, unique) => {
    let result = rows.find(row => row.unique === group);
    if (result && unique) {
        return result.children.find(item => item.unique === unique);
    }
    return result;
};

export const TopicViewer = () => {
    const { group, unique } = useParams();
    // 转换，排序
    const topics = (useRecoilValue(callGithubAPI(params)) || []).map((issue) => {
        const { body: issueContent, comments, ...issueInfo } = issue;
        // 解析 issue 内容
        const { content, unique, ...issueExtra } = parseMarkdown(issueContent);
        // 解析 issue comment 内容，评论内容排序
        const children = comments.nodes.map(({ body: comment, ...commentInfo }) => {
            return { node: 'comment', ...commentInfo, ...parseMarkdown(comment) };
        }).sort((a, b) => a.sort - b.sort);
        return { node: 'issue', sort: 99999, ...issueExtra, content, unique, ...issueInfo, children };
    }).sort((a, b) => a.sort - b.sort);
    console.log('topic issues', topics, get(topics, group, unique));
    const { content } = (get(topics, group, unique) || {});
    return (
        <div className={styles.root}>
            <dl className={styles.tree}>
                {topics.map((group, index) => (
                    <Fragment key={index}>
                        <dt>
                            <Link to={`/v2/topics/${group.unique}`}>{group.title}</Link>
                        </dt>
                        <dd>
                            <ul>
                                {group.children.map(({ unique, title }, index) => (
                                    <li key={index}>
                                        <Link to={`/v2/topics/${group.unique}/${unique}`}>{title || unique}</Link>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </Fragment>
                ))}
            </dl>
            <div className={styles.board}>
                <MarkdownViewerV1 code={content} />
            </div>
        </div>
    );
};