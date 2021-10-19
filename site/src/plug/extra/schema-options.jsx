import ReactJsonSchema from 'react-json-schema';

import DriftNav from "plug/extra/drift-navi/drift-navi.module.jsx";
import SiteLayout from "plug/layout/site-layout/site-layout.module.jsx";

import TabLayout from "plug/layout/tab-layout/tab-layout.module.jsx";

import IssueCommentsView from "plug/github/issue/comments/issue-comments.module.jsx";


const renderer = new ReactJsonSchema();

renderer.setComponentMap({
    DriftNav,
    SiteLayout,
    TabLayout,

    IssueCommentsView
});

export default (schema) => renderer.parseSchema(Object.assign({ component: 'div' }, schema));