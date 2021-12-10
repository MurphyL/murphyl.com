import React, { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Outlet, useRoutes } from "react-router-dom";

import loadable from '@loadable/component';

import site from 'data/cache/site.toml.json';
import graphql from 'data/cache/graphql.toml.json';

import { MapperContext } from 'plug/extra/x-context';

import { Dynamic, ErrorBoundary, Loading } from 'plug/extra/status/status.module';

import SiteLayout from "plug/layout/site-layout/site-layout.module";
import DriftLayout from "plug/layout/drift-layout/drift-layout.module";

import Home from 'view/home/home.module';
import Blog from 'view/blog/blog.module';
import Post from 'view/post/post.module';

import SchemaViewer from 'view/page/schema/schema-page.module';

import { DiffEditor } from 'plug/extra/code/code.module';

import * as JSONKits from 'view/kits/json/v1/json-kits-v1.module';

import kits from 'view/kits/kits-router.js';

const DynamicPage = loadable(() => import('view/page/dynamic/dynamic-page.module'));

const Views = () => useRoutes([{
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
    element: <DriftLayout />,
    children: kits
}, {
    path: '/kits/json/v1',
    element: <JSONKits.Layout />,
    children: JSONKits.Routes
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
    }, {
        path: 'text-differ',
        element: <DiffEditor />,
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
                    <MapperContext.Provider value={{ site, graphql }}>
                        <BrowserRouter>
                            <Views />
                        </BrowserRouter>
                    </MapperContext.Provider>
                </RecoilRoot>
            </ErrorBoundary>
        </StrictMode>
    );
}