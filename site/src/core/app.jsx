import React, { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';

import { Router, Route } from "wouter";

import loadable from '@loadable/component';

import site from 'cache/site.toml.json';
import graphql from 'cache/graphql.toml.json';

import { MapperContext } from 'plug/extra/x-context.jsx';

import { ErrorBoundary } from 'plug/extra/status/status.module.jsx';

/** 
const Router = () => useRoutes([{
    path: '/',
    children: [
        {
            index: true, element: createElement(loadable(() => import('view/home/home.module')))
        },
        {
            path: '/blog', element: createElement(loadable(() => import('view/blog/blog.module')))
        },
        {
            path: '/post/:unique', element: createElement(loadable(() => import('view/post/post.module')))
        },
        {
            path: '/page/list', element: createElement(loadable(() => import('view/kits/page/dynamic/dynamic-page.module')))
        },
        {
            path: '/kits/json', element: createElement(loadable(() => import('view/kits/json/json-kits.module')))
        },
        {
            path: '/notebook',
            element: createElement(loadable(() => import('view/kits/notebook/notebook.module'))),
            children: [{
                path: '/notebook/:group',
                element: <Outlet />,
                children: [{
                    path: '/notebook/:group/:unique',
                    element: <Outlet />,
                }]
            }]
        },
    ]
}]);
*/
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
                            <Router>
                                <Route path="/" component={loadable(() => import('view/home/home.module'))} />
                                <Route path="/blog" component={loadable(() => import('view/blog/blog.module'))} />
                                <Route path="/post/:unique" component={loadable(() => import('view/post/post.module'))} />
                                <Route path="/page/list" component={loadable(() => import('view/kits/page/dynamic/dynamic-page.module'))} />
                                <Route path="/kits/json" component={loadable(() => import('view/kits/json/json-kits.module'))} />
                                <Route path="/kits/crypto" component={loadable(() => import('view/kits/crypto/crypto-kits.module'))} />
                                <Route path="/kits/editor/chameleon" component={loadable(() => import('view/kits/editor/chameleon/chameleon-editor.module'))} />
                            </Router>
                        </MapperContext.Provider>
                    </RecoilRoot>
                </ErrorBoundary>
            </HelmetProvider>
        </StrictMode>
    );
}