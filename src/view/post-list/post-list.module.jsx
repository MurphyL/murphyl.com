import React from 'react';
import { useRecoilValue } from 'recoil';

import { fetchIssueList } from '../../plug/github-api';

import PostSummary from '../post-summary/post-summary.module';

export default function PostList() {
    const [success, payload] = useRecoilValue(fetchIssueList({ a: 1 }));
    console.log(success, payload);
    return (
        <div>
            <div>Post List</div>
            {success && Array.isArray(payload.nodes) ? (
                <React.Fragment>
                    {payload.nodes.map((item, index) => (
                        <PostSummary key={index} payload={item} />
                    ))}
                </React.Fragment>
            ) : (
                <div>{payload}</div>
            )}
        </div>
    );
}