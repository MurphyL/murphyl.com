import React, { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, useRoutes } from "react-router-dom";

import loadable from '@loadable/component';

import site from 'data/cache/site.toml.json';
import graphql from 'data/cache/graphql.toml.json';

import { MapperContext } from 'plug/extra/x-context';

import { Dynamic, ErrorBoundary } from 'plug/extra/status/status.module';

import DriftLayout from "plug/layout/drift-layout/drift-layout.module";
import SiteLayout from "plug/layout/site-layout/site-layout.module";

import Home from 'view/home/home.module';
import Blog from 'view/blog/blog.module';
import Post from 'view/post/post.module';

import SchemaViewer from 'view/page/schema/schema-page.module';


const JSONKits = loadable(() => import('view/kits/json/json-kits.module'));
const SQLKits = loadable(() => import('view/kits/sql/sql-kits.module'));
const Notebook = loadable(() => import('view/kits/notebook/notebook.module'));
const TextDiffer = loadable(() => import('view/kits/text-differ/text-differ.module'));
const DynamicPage = loadable(() => import('view/page/dynamic/dynamic-page.module'));

const Expression = loadable(() => import('view/kits/expression/expression.module'));

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
    children: [{
        path: 'json',
        element: <Dynamic title="JSON 工具集" children={<JSONKits />} />
    }, {
        path: 'sql',
        element: <Dynamic title="SQL 工具集" children={<SQLKits />} />
    }, {
        path: 'text-differ',
        element: <Dynamic title="文本比较" children={<TextDiffer />} />
    }, {
        path: 'expression',
        element: <Dynamic title="表达式工具集" children={<Expression />} />
    }, {
        path: 'crypto',
        element: <div>crypto</div>
    }, {
        path: 'notebook',
        element: <Dynamic title="笔记" children={<Notebook />} />
    }, {
        path: '*',
        element: <div>未实现工具</div>
    }]
}, {
    path: '/page/list',
    element: <DriftLayout children={<Dynamic title="动态页面" children={<DynamicPage />} />} />
}, {
    path: '*',
    element: <div>404</div>
}]);

export default function App() {
    return (
        <StrictMode>
            <HelmetProvider>
                <ErrorBoundary>
                    <RecoilRoot>
                        <MapperContext.Provider value={{ site, graphql }}>
                            <BrowserRouter>
                                <Views />
                            </BrowserRouter>
                        </MapperContext.Provider>
                    </RecoilRoot>
                </ErrorBoundary>
            </HelmetProvider>
        </StrictMode>
    );
}