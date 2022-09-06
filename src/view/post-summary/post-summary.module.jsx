import Markdown from 'markdown-to-jsx';

export default function PostSummary({ payload = {} }) {
    return (
        <div data-gh-issue-id={payload.id} data-gh-issue-number={payload.number}>
            <h2>{payload.title}</h2>
            <div>
                <Markdown options={{ forceBlock: true }} children={payload.bodyText} />
            </div>
        </div>
    );
}