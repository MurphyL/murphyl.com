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

const Notebook = loadable(() => import('view/kits/notebook/notebook.module'));

const DynamicPage = loadable(() => import('view/kits/page/dynamic/dynamic-page.module'));

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
    }]
}, {
    path: '/kits',
    element: <DriftLayout />,
    children: [{
        path: 'cli/manual',
        element: <div>hello</div>
    }, {
        path: 'json',
        element: <div>json</div>
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
    element: <Dynamic title="动态页面" children={<DynamicPage />} />
}, {
    path: '*',
    element: <div>404</div>
}]);

/**
function SiteRouter() {
    return (
        <MapperContext.Provider value={{ site, graphql }}>
            <BrowserRouter>
                <Route path={['/', '/home']} exact={true} component={loadable(() => import('view/home/home.module'))} />
                <Route path={["/about", "/about/:version"]} exact={true} children={<SchemaRenderer unique="about" />} />
                <Route path="/blog" exact={true} component={loadable(() => import('view/blog/blog.module'))} />
                <Route path="/post/:unique" exact={true} component={loadable(() => import('view/post/post.module'))} />
                <Route path="/page/list" exact={true} component={loadable(() => import('view/kits/page/dynamic/dynamic-page.module'))} />
                <Route path={['/notebook', '/notebook/:group', '/notebook/:group/:unique']} exact={true} component={loadable(() => import('view/kits/notebook/notebook.module'))} />
                <Route path="/kits/json" exact={true} component={loadable(() => import('view/kits/json/json-kits.module'))} />
                <Route path="/kits/crypto" exact={true} component={loadable(() => import('view/kits/crypto/crypto-kits.module'))} />
                <Route path="/kits/editor/difference" exact={true} component={loadable(() => import('view/kits/editor/difference/difference-editor.module'))} />
                <Route path={['/kits/editor/chameleon', '/kits/editor/chameleon/:unique']} exact={true} component={loadable(() => import('view/kits/editor/chameleon/chameleon-editor.module'))} />
                <Route path="/page/schema/:unique" exact={true} component={SchemaPage} />
                <Route>404</Route>
            </BrowserRouter>
        </MapperContext.Provider>
    )
};
 */
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
                            {/* <Router>
                                <Route path="/" component={loadable(() => import('view/home/home.module'))} />
                                <Route path="/blog" component={loadable(() => import('view/blog/blog.module'))} />
                                <Route path="/post/:unique" component={loadable(() => import('view/post/post.module'))} />
                                <Route path="/page/list" component={loadable(() => import('view/kits/page/dynamic/dynamic-page.module'))} />
                                <Route path="/kits/json" component={loadable(() => import('view/kits/json/json-kits.module'))} />
                                <Route path="/kits/crypto" component={loadable(() => import('view/kits/crypto/crypto-kits.module'))} />
                                <Route path="/kits/editor/chameleon" component={loadable(() => import('view/kits/editor/chameleon/chameleon-editor.module'))} />
                            </Router> */}
                        </MapperContext.Provider>
                    </RecoilRoot>
                </ErrorBoundary>
            </HelmetProvider>
        </StrictMode>
    );
}