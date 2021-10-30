import React, { Fragment } from 'react';

import classNames from 'classnames';

import ReactJsonSchema from 'react-json-schema';

import DriftNav from "plug/extra/drift-navi/drift-navi.module";
import SiteLayout from "plug/layout/site-layout/site-layout.module";

import TabLayout from "plug/layout/tab-layout/tab-layout.module";

import IssueComments from "plug/github/issue/comments/issue-comments.module";

import DynamicTable from "plug/extra/dynamic-table/dynamic-table.module";

const renderer = new ReactJsonSchema();

renderer.setComponentMap({
    Fragment,

    DriftNav,
    SiteLayout,
    TabLayout,
    DynamicTable,

    IssueComments
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