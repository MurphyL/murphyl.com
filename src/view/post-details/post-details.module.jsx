import React from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, useParams } from 'react-router-dom';

import Markdown from 'markdown-to-jsx';

import { useDocumentTitle } from '/src/plug/hooks';
import { getIssueDetails } from '/src/plug/github-api';

const STATE_LIST = ['POST_LIST'];

export default function PostDetails() {
    const { postId } = useParams();
    const { state, origin } = useLocation();
    return state && state.payload && STATE_LIST.includes(state.origin) && parseInt(postId) === state.payload.number ? (
        <SyncPostDetails payload={state.payload} />
    ) : (
        <AsyncPostDetails postId={postId} />
    );
}

function AsyncPostDetails({ postId }) {
    const [success, payload, errors] = useRecoilValue(getIssueDetails(postId));
    return success ? (
        <SyncPostDetails payload={payload} />
    ) : (
        <dl>
            <dt>加载文章（number={postId}）数据错误：</dt>
            <dd>
                {errors ? (
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>
                                <div>{error.message}</div>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </dd>
        </dl>
    );
}

function SyncPostDetails({ payload }) {
    useDocumentTitle(payload && payload.title ? `${payload.title} | 文章` : '错误的文章页面');
    return payload ? (
        <div>
            <h2>{payload.title}</h2>
            <div>
                <Markdown options={{ forceBlock: true }} children={payload.bodyText} />
            </div>
        </div>
    ) : (
        <pre>
            <code>{JSON.stringify(payload, null, 4)}</code>
        </pre>
    );
}