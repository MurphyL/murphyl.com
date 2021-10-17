import React, { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { NavLink } from "react-router-dom";
import { callGithubAPI, parseMarkdown } from 'plug/extra/rest-utils.jsx';

import styles from './topic-v2.module.css';

const TopicGroup = ({ group }) => {
    const nodes = group.comments.nodes.map(node => {
        const { meta, content } = parseMarkdown(node.body);
        return { sort: 99999, ...meta, ...node, content };
    }).sort((a, b) => a.sort - b.sort);
    return (
        <Fragment>
            <dt>
                <NavLink to={`/v2/topics/${group.unique}`} activeClassName="selected">{group.title}</NavLink>
            </dt>
            <dd>
                <ul>
                    {nodes.map((node, index) => (
                        <li key={index}>
                            <NavLink to={`/v2/topics/${node.unique}`} activeClassName="selected">{node.title}</NavLink>
                        </li>
                    ))}
                </ul>
            </dd>
        </Fragment>
    );
};

export const TopicViewer = () => {
    const topics = useRecoilValue(callGithubAPI({
        key: 'query-issue-comments',
        ghp_labels: 'X-TOPIC',
        path: 'data.repository.issues.nodes'
    })).map((node) => {
        const { meta, content } = parseMarkdown(node.body);
        return { sort: 99999, ...meta, ...node, content };
    }).sort((a, b) => a.sort - b.sort);
    console.log('topic issues', topics);
    return (
        <div className={styles.root}>
            <dl className={styles.tree}>
                {topics.map((group, index) => (
                    <TopicGroup key={index} group={group} />
                ))}
            </dl>
            <div className={styles.board}></div>
        </div>
    );
};