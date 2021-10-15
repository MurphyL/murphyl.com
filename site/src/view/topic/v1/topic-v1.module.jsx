import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import toast, { Toaster } from 'react-hot-toast';

// import simpleIcons from 'simple-icons';
import { callGithubAPI } from 'plug/extra/rest_utils.jsx';
import { parseTOML } from 'plug/extra/rest_utils.jsx';

import styles from './topic-v1.module.css';


const notify = () => toast((t) => (
    <div>新版本已经发布，前往<Link to={'/v2/topics'}>查看新版本</Link></div>
), {
    duration: 5000
});

function TopicCard({ group, card }) {
    return (
        <div className={styles.card}>
            <div className={styles.card_container}>
                <div className={styles.title}>
                    <Link to={{
                        pathname: `/topics/${group}/${card.unique}`,
                        state: { [`card-${card.unique}`]: card }
                    }}>{card.title || '这里什么也没有！'}</Link>
                </div>
                <div className={styles.desc}>{card.desc || '这里什么也没有！'}</div>
            </div>
        </div>
    );
};

function TopicGroup({ id, body }) {
    const { unique, title, items } = parseTOML(body);
    return (
        <div className={styles.card_group} data-group={id} data-unique={unique}>
            <h3 className={styles.group_title}>
                <Link to={`/topics/${unique}`}>{title || '无标题'}</Link>
            </h3>
            <div className={styles.card_list}>
                {(items || []).map((card, index) => (
                    <TopicCard key={index} group={unique} card={card} />
                ))}
            </div>
        </div>
    );
};

function TopicMeta({ topic }) {
    return (
        <Fragment>
            <Helmet>
                <title>{topic.title} - 分类文章 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.meta}>
                <h3>{topic.title}</h3>
                <p>{topic.desc}</p>
            </div>
        </Fragment>
    );
}

function AjaxTopicMeta({ unique }) {
    const fetched = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: `X-POST/${unique.toUpperCase()}`,
    }));
    console.log(fetched);
    return (
        <Fragment>
            <span>ajax - {unique}</span>
            <TopicMeta />
        </Fragment>
    );
};

export function TopicGroupViewer() {
    const [selected] = useState(0);
    const { group } = useParams();
    const groupList = useRecoilValue(callGithubAPI({
        key: 'query-issue-comments',
        ghp_labels: `X-TOPIC/${group.toUpperCase()}`,
        path: 'data.repository.issues.nodes'
    }));
    console.log(groupList);
    return (
        <div className={styles.group_viewer}>
            <dl className={styles.group_tree}>
                {(groupList || []).map((item, index) => (
                    <Fragment key={index}>
                        <dt>{item.title}</dt>
                        <dd></dd>
                    </Fragment>
                ))}
            </dl>
            <div className={styles.group_reader}>group viewer - {group} - {JSON.stringify(groupList[selected])}</div>
        </div>
    );
};

export function TopicDetails() {
    const { unique } = useParams();
    const { state } = useLocation();
    const topics = useRecoilValue(callGithubAPI({
        key: 'query-issue-list',
        ghp_labels: `X-POST/${unique.toUpperCase()}`,
        path: 'data.repository.issues.nodes'
    }));
    const meta = (state || {})[`card-${unique}`]
    console.log(`X-POST/${unique.toUpperCase()}`, meta, topics);
    return (
        <Fragment>
            {meta ? <TopicMeta topic={meta} /> : <AjaxTopicMeta unique={unique} />}
            <ul>
                {(topics || []).map((topic, index) => (
                    <li key={index}>
                        <Link to={`/post/${topic.number}`}>{topic.title}</Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export function TopicGroupList() {
    useEffect(() => {
        notify();
    }, []);
    const topics = useRecoilValue(callGithubAPI({
        key: 'query-issue-comments',
        ghp_labels: 'X-TOML/TOPIC',
        path: 'data.repository.issues.nodes'
    }));
    const [topic] = topics;
    console.log('topic', topic);
    return topic ? (
        <Fragment>
            <Helmet>
                <title>{topic.title} - 主题 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <Toaster />
            <div className={styles.group_list}>
                {topic.comments && (topic.comments.nodes || []).map((group, index) => (
                    <TopicGroup key={index} {...group} />
                ))}
            </div>
        </Fragment>
    ) : (
        <div>配置数据加载错误</div>
    );
};
