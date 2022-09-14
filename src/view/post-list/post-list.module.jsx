import React from 'react';
import { useRecoilValue } from 'recoil';

import { useDocumentTitle } from '/src/plug/hooks';
import { fetchIssueList } from '/src/plug/github-api';

import PostSummary from '../post-summary/post-summary.module';

export default function PostList() {
    useDocumentTitle();
    const [success, payload] = useRecoilValue(fetchIssueList({ a: 1 }));
    return (
        <div>
            {success && Array.isArray(payload.nodes) ? (
                <React.Fragment>
                    {payload.nodes.map((item, index) => (
                        <PostSummary key={index} payload={item} origin="POST_LIST" />
                    ))}
                </React.Fragment>
            ) : (
                <div>{payload}</div>
            )}
        </div>
    );
}