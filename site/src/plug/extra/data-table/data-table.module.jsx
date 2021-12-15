import React, { useEffect, useState } from "react";

import classNames from 'classnames';

export default function DataTable({ className, children }) {
    const [[columns, filter]] = useState([]);
    useEffect(() => {
        if (React.Children.count(children) === 0) {
            return;
        }
        React.Children.forEach(child => {
            console.log(child);
        });
    }, children);
    console.log(columns, filter);
    return (
        <table className={classNames(className)}></table>
    );
}