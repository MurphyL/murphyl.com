import React, { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, useRoutes } from "react-router-dom";

import loadable from '@loadable/component';

import { Dynamic, ErrorBoundary, Loading } from 'plug/extra/status/status.module';

import SiteLayout from "plug/layout/site-layout/site-layout.module";
import DriftLayout from "plug/layout/drift-layout/drift-layout.module";

import Home from 'view/home/home.module';
import Blog from 'view/blog/blog.module';
import Post from 'view/post/post.module';

import Notebook from 'view/notebook/notebook.module';

import SchemaViewer from 'view/page/schema/schema-page.module';

import KitList from 'view/kits/kits';
import SQLKits from 'view/kits/sql/v1/sql-kits-v1.module';
import JSONKits from 'view/kits/json/v1/json-kits-v1.module';

import NaviLayout from 'plug/layout/navi-layout/navi-layout.module';

const DynamicPage = loadable(() => import('view/page/dynamic/dynamic-page.module'));

const RouteViews = () => useRoutes([{
    path: '/',
    element: <SiteLayout />,
    children: [{
        index: true,
        element: <Home />
    }, {
        path: 'blog',
        element: <Dynamic title="博客" children={<Blog />} />
    }, {
        path: 'post/:unique',
        element: <Dynamic title="文章" children={<Post />} />
    }, {
        path: 'about',
        element: <Dynamic title="关于" children={<SchemaViewer unique="about-v2" />} />
    }]
}, {
    path: '/kits',
    element: <NaviLayout navi={[{ name: 'All kits', path: './' }]} />,
    children: [SQLKits, JSONKits, KitList]
}, {
    path: '/kits/notebook',
    element: <Dynamic><Notebook /></Dynamic>,
}, {
    path: '/schema',
    element: <DriftLayout />,
    children: [{
        path: 'page',
        element: <Dynamic title="动态页面" children={<DynamicPage />} />,
    }]
}, {
    path: '/demo',
    element: <DriftLayout />,
    children: [{
        path: 'loading',
        element: <Loading color="red" />,
    }]
}, {
    path: '*',
    element: <div>404</div>
}]);

export default function App() {
    return (
        <StrictMode>
            <ErrorBoundary>
                <RecoilRoot>
                    <BrowserRouter>
                        <RouteViews />
                    </BrowserRouter>
                </RecoilRoot>
            </ErrorBoundary>
        </StrictMode>
    );
}