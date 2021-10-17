import React from 'react';

import styles from './api-explorer.module.css';

const tree = {
    'github/v4': {
        endpoint: 'https://api.github.com/graphql',
        label: 'Github GraphQL',
        method: 'POST',
        children: [{
            label: '查询 Issue 列表',
            ql: 'query-issue-list'
        }, {
            label: '查询 Issue 详情',
            ql: 'get-issue-details'
        }, {
            label: '查询 Issue 评论',
            ql: 'query-issue-comments'
        }]
    }

};


export default function API_Explorer() {
    return (
        <div className={styles.root}>
            <div className={styles.editor}>
                {Object.entries(tree).map(([category, options]) => (
                    <div key={category}>
                        <div>{options.label}</div>
                        <div>
                            {(options.children || []).map((item, index) => (
                                <div key={index}>{item.label}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.viewer}>
                <div className={styles.options}></div>
                <div className={styles.result}></div>
            </div>
        </div>
    );
}