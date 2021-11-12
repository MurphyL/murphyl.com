import React, { StrictMode, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import loadable from '@loadable/component';

import site from 'cache/site.toml.json';
import graphql from 'cache/graphql.toml.json';

import { MapperContext } from 'plug/extra/x-context.jsx';

import { ErrorBoundary, Loading } from 'plug/extra/status/status.module.jsx';

import { SchemaPage, SchemaRenderer } from 'view/kits/page/schema/schema-page.module';

function SiteRouter() {
    return (
        <MapperContext.Provider value={{ site, graphql }}>
            <BrowserRouter>
                <Switch>
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
                </Switch>
            </BrowserRouter>
        </MapperContext.Provider>
    )
};

export default function App() {
    return (
        <StrictMode>
            <HelmetProvider>
                <ErrorBoundary>
                    <RecoilRoot>
                        <Suspense fallback={<Loading />}>
                            <SiteRouter />
                        </Suspense>
                    </RecoilRoot>
                </ErrorBoundary>
            </HelmetProvider>
        </StrictMode>
    );
}