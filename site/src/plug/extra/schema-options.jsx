import ReactJsonSchema from 'react-json-schema';

import DriftNav from "plug/extra/drift-navi/drift-navi.module.jsx";
import SiteLayout from "plug/layout/site-layout/site-layout.module.jsx";

import TabLayout from "plug/layout/tab-layout/tab-layout.module.jsx";

import IssueComments from "plug/github/issue/comments/issue-comments.module.jsx";

import DynamicTable from "plug/extra/dynamic-table/dynamic-table.module.jsx";

const renderer = new ReactJsonSchema();

renderer.setComponentMap({
    DriftNav,
    SiteLayout,
    TabLayout,
    DynamicTable,

    IssueComments
});

export default (schema) => renderer.parseSchema(Object.assign({ component: 'div' }, schema));