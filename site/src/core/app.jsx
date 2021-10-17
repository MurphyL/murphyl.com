import React, { StrictMode, Suspense } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MapperContext from 'plug/extra/mepper-context.jsx';

import { ErrorBoundary, Dynamic, Loading } from 'plug/extra/status/status.module.jsx';

import SiteLayout from "plug/layout/site-layout/site-layout.module.jsx";

import Home from 'view/home/home.module.jsx';

import Blog from 'view/blog/blog.module.jsx';
import Post from 'view/post/post.module.jsx';

import Snippet from 'view/kits/snippet/snippet.module.jsx';

import Chameleon from 'view/kits/chameleon/chameleon.module.jsx';
import DiffEditor from 'view/kits/editor/diff/diff-editor.module.jsx';

import API_Explorer from 'view/kits/explorer/api/api-explorer.module.jsx';
import { SchemaPage, SchemaRenderer } from 'view/kits/schema/page/schema-page.module.jsx';

import { TopicGroupList, TopicGroupViewer, TopicDetails } from 'view/topic/v1/topic-v1.module.jsx';
import { TopicViewer } from 'view/topic/v2/topic-v2.module.jsx';

import { fetchGraphQlMapper } from 'plug/extra/rest-utils.jsx';

function SiteRouter() {
    const graphql = useRecoilValue(fetchGraphQlMapper());
    return (
        <MapperContext.Provider value={graphql}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/blog" exact={true} component={Blog} />
                    <Route path={["/about", "/about/:version"]} exact={true} children={<SchemaRenderer unique="about" />} />
                    <Route path="/post/:unique" exact={true} component={Post} />
                    <Route path="/schema/page/:unique" exact={true} component={SchemaPage} />
                    <Route path={['/topics', '/v1/topics']} exact={true}>
                        <Dynamic children={<TopicGroupList />} layout={SiteLayout} />
                    </Route>
                    <Route path={['/topics/:group', '/v1/topics/:group']} exact={true}>
                        <Dynamic children={<TopicGroupViewer />} />
                    </Route>
                    <Route path={['/topics/:group/:unique', '/v1/topics/:group/:unique']} exact={true}>
                        <Dynamic children={<TopicDetails />} layout={SiteLayout} />
                    </Route>
                    <Route path={["/v2/topics", "/v2/topics/:group", "/v2/topics/:group/:unique"]} exact={true} component={TopicViewer} />
                    <Route path="/kits/snippet" exact={true} component={Snippet} />
                    <Route path="/kits/diff-editor" exact={true} component={DiffEditor} />
                    <Route path="/kits/chameleon" exact={true} component={Chameleon} />
                    <Route path="/kits/api/explorer" exact={true} component={API_Explorer} />
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