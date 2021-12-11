import { useMemo } from 'react';

import { useIssueComments } from '../../graphql-utils';

export default function IssueSchema({ label, unique }) {
    const issues = useIssueComments(label);
    console.log(issues);
    return (
        <div></div>
    );
}
