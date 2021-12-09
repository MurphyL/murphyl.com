import React, { Fragment } from 'react';

import classNames from 'classnames';

import ReactJsonSchema from 'react-json-schema';

import DriftNav from "plug/extra/drift-navi/drift-navi.module";
import SiteLayout from "plug/layout/site-layout/site-layout.module";


import IssueComments from "plug/github/issue/comments-tab/issue-comments-tab.module";

import IssueCommentsTable from "plug/github/issue/comments-table/issue-comments-table.module";

import DynamicLink from "plug/dynamic/link/dynamic-link.module";
import DynamicList from "plug/dynamic/list/dynamic-list.module";
import DynamicTable from "plug/dynamic/table/dynamic-table.module";

const renderer = new ReactJsonSchema();

renderer.setComponentMap({
    Fragment,

    DriftNav,
    SiteLayout,

    DynamicLink,
    DynamicList,
    DynamicTable,

    IssueComments,
    IssueCommentsTable
});

export default (schema) => {
    const { component = 'Fragment', className, children = [] } = schema;
    const classes = classNames('schema-root', className);
    if (component === 'Fragment') {
        return (
            <div className={classes}>
                {renderer.parseSchema({ component, children })}
            </div>
        );
    } else {
        return renderer.parseSchema(Object.assign({ component: 'div', className: classes }, schema));
    }

};