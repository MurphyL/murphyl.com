import React, { StrictMode, Suspense } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MapperContext from 'plug/extra/mepper_context.jsx';

import { ErrorBoundary, Loading } from 'plug/extra/status/status.module.jsx';

import SiteLayout from "plug/layout/site-layout/site-layout.module.jsx";

import Home from 'view/home/home.module.jsx';

import Blog from 'view/blog/blog.module.jsx';
import Post from 'view/post/post.module.jsx';

import Snippet from 'view/kits/snippet/snippet.module.jsx';

import { SchemaPage, SchemaView, SchemaComponent, SchemaRenderer } from 'view/kits/schema/page/schema_page.module.jsx';

import { TopicGroupList, TopicGroupViewer, TopicDetails } from 'view/topic/topic.module.jsx';

import { fetchGraphQlMapper } from 'plug/extra/rest_utils.jsx';

function SiteRouter() {
    const graphql = useRecoilValue(fetchGraphQlMapper());
    return (
        <MapperContext.Provider value={graphql}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/blog" exact={true} component={Blog} />
                    <Route path={["/about", "/about/:version"]} exact={true}>
                        <SchemaRenderer unique="about" />
                    </Route>
                    <Route path="/post/:unique" exact={true} component={Post} />
                    <Route path={["/schema/page/:unique", "/schema/page/:unique/:version"]} exact={true} component={SchemaPage} />
                    <Route path={["/schema/view/:layout/:unique", "/schema/view/:layout/:unique/:version"]} exact={true} component={SchemaView} />
                    <Route path={["/schema/component/:unique", "/schema/component/:unique"]} exact={true} component={SchemaComponent} />
                    <Route path={['/topics', '/collections']} exact={true}>
                        <SiteLayout>
                            <Suspense fallback={<Loading />}>
                                <TopicGroupList />
                            </Suspense>
                        </SiteLayout>
                    </Route>
                    <Route path={['/topics/:group', '/collections/:group']} exact={true}>
                        <Suspense fallback={<Loading />}>
                            <TopicGroupViewer />
                        </Suspense>
                    </Route>
                    <Route path={['/topics/:group/:unique', '/collections/:group/:unique']} exact={true}>
                        <SiteLayout>
                            <Suspense fallback={<Loading />}>
                                <TopicDetails />
                            </Suspense>
                        </SiteLayout>
                    </Route>
                    <Route path="/snippet" exact={true} component={Snippet} />
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