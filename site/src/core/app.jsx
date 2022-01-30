import React, { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, useRoutes } from "react-router-dom";

import { Toaster } from 'react-hot-toast';

import { Dynamic, ErrorBoundary, Loading } from 'plug/extra/status/status.module';

import SiteLayout from "plug/layout/site-layout/site-layout.module";
import DriftLayout from "plug/layout/drift-layout/drift-layout.module";

import Home from 'view/home/home.module';
import Blog from 'view/blog/blog.module';
import Post from 'view/post/post.module';
import Kits from 'view/kits/v1/kits.module';

import SchemaViewer from 'view/page/schema/schema-page.module';

import KitsHome from 'view/kits/kits';
import DemoList from 'view/kits/demo/demo.module';
import Notebook from 'view/notebook/notebook.module';
import SQLKits from 'view/kits/sql/v1/sql-kits-v1.module';
import JSONKits from 'view/kits/json/v1/json-kits-v1.module';
import DynamicPage from 'view/page/dynamic/dynamic-page.module';

import NaviLayout from 'plug/layout/navi-layout/navi-layout.module';

import DataTable from 'plug/dynamic/table/dynamic-table.module';

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
    element: <NaviLayout />,
    children: [KitsHome, SQLKits, JSONKits, Notebook, DemoList]
}, {
    path: '/kits/v2',
    element: <NaviLayout />,
    children: [ {
        index: true,
        element: <Kits />,
    } ]
}, {
    path: '/schema',
    element: <DriftLayout />,
    children: [{
        path: 'page',
        element: <Dynamic title="动态页面"><DynamicPage /></Dynamic>,
    }]
}, {
    path: '/demo',
    element: <DriftLayout />,
    children: [{
        path: 'loading',
        element: <Loading color="red" />,
    }, {
        path: 'datatable',
        element: <DataTable />,
    }]
}, {
    path: '*',
    element: <div>404</div>
}]);

RouteViews.dispalyName = 'Application.RouteViews';

export default function App() {
    return (
        <StrictMode>
            <RecoilRoot>
                <BrowserRouter>
                    <ErrorBoundary>
                        <RouteViews />
                    </ErrorBoundary>
                    <Toaster />
                </BrowserRouter>
            </RecoilRoot>
        </StrictMode>
    );
}