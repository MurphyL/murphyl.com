import { Link } from 'react-router-dom';

import Markdown from 'markdown-to-jsx';

export default function PostSummary({ payload = {}, origin }) {
    return (
        <div data-gh-issue-id={payload.id} data-gh-issue-number={payload.number}>
            <Link to={`/posts/${payload.number}`} state={{ payload, origin }}>
                <h2>{payload.title}</h2>
            </Link>
            <div>
                <Markdown options={{ forceBlock: true }} children={payload.bodyText} />
            </div>
        </div>
    );
}