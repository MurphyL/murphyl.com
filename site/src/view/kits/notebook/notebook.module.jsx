import React, { Fragment, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from "react-router-dom";

import DriftNavi from 'plug/extra/drift-navi/drift-navi.module';

import { callGithubAPI } from 'plug/extra/rest-utils.jsx';

import { MarkdownViewer, parseMarkdown } from "plug/extra/markdown/v1/markdown-v1.module";

import styles from './notebook.module.css';

const params = {
    key: 'query-issue-comments',
    ghp_labels: 'X-TOPIC',
    path: '$.data.repository.issues.nodes'
};

const get = (rows, group, unique) => {
    let result = rows.find(row => row.unique === group);
    if (result && unique) {
        return result.children.find(item => item.unique === unique);
    }
    return result;
};

export default function Notebook() {
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
    const current = group ? get(topics, group, unique) : topics[0];
    return (
        <div className={styles.root}>
            <aside className={styles.tree}>
                <dl>
                    {topics.map((group, index) => (
                        <Fragment key={index}>
                            <dt>
                                <Link to={`/kits/notebook/${group.unique}`}>{group.title}</Link>
                            </dt>
                            <dd>
                                <ul>
                                    {group.children.map(({ unique, title }, index) => (
                                        <li key={index}>
                                            <Link to={`/kits/notebook/${group.unique}/${unique}`}>{title || unique}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </Fragment>
                    ))}
                </dl>
            </aside>
            <main className={styles.board}>
                {current ? (
                    <Fragment>
                        <Helmet>
                            <title>{current.title} - {process.env.REACT_APP_TITLE}</title>
                        </Helmet>
                        <div className={styles.header}>
                            <b>{current.title}</b>
                            <div className={styles.toolbar}>
                                <Link to="/">主页</Link>
                                <a href={current.url} target="_blank" rel="noopener noreferrer">编辑</a>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <MarkdownViewer code={current.content} />
                        </div>
                        <DriftNavi postion={['right', 'bottom']}>
                            <Link to="/">首页</Link>
                        </DriftNavi>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Helmet>
                            <title>没有相关的代码片段 - {process.env.REACT_APP_TITLE}</title>
                        </Helmet>
                        <div>404</div>
                    </Fragment>
                )}
            </main>
        </div>
    );
};