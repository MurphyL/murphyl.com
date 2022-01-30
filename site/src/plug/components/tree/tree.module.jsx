import { useMemo } from 'react';
import { arrayToTree } from "performant-array-to-tree";


const TreeItem = ({ data, children }) => {
    return (
        <div>{ data.name }</div>
    );
};

export default function TreeView({ data = [] }) {
    const items = useMemo(() => arrayToTree(data), [data]);
    return (
        <div>
            {items.map((item, index) => (
                <TreeItem key={index} {...item} />
            ))}
        </div>
    );
}