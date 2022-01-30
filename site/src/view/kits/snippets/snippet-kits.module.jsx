import Masonry from 'react-masonry-component';

import { useDocumentTitle } from 'plug/hooks';

const items = [];

console.log(items);

function SnippetCard({ unique, ts }) {
    return (
        <div>
            <div>{unique}</div>
            <div>{ts}</div>
        </div>
    );
}


export default function SnippetKit() {
    useDocumentTitle('代码片段');
    return (
        <div>
            <Masonry>
                {Array.isArray(items['../snippets/']) && items['../snippets/'].map(({ __unique, __type, __timestamp, __content }, index) => (
                    <div key={index}>
                        <SnippetCard key={index} unique={__unique} type={__type} ts={__timestamp} {...__content} />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}