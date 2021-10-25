import React, { StrictMode, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import graphql from '../graphql.json';

import { ThemeContext, MapperContext } from 'plug/extra/mepper-context.jsx';

import { ErrorBoundary, Dynamic, Loading } from 'plug/extra/status/status.module.jsx';

import SiteLayout from "plug/layout/site-layout/site-layout.module.jsx";

import Home from 'view/home/home.module.jsx';

import Blog from 'view/blog/blog.module.jsx';
import Post from 'view/post/post.module.jsx';

import Notebook from 'view/kits/notebook/notebook.module.jsx';

import ChameleonEditor from 'view/kits/editor/chameleon/chameleon-editor.module.jsx';
import MarkdownEditor from 'view/kits/editor/markdown/markdown-editor.module.jsx';
import DifferenceEditor from 'view/kits/editor/difference/difference-editor.module.jsx';
import { CronExpressionMaker, DockerCommandMaker } from 'view/kits/expression/maker/expression-maker.module.jsx';

import { SchemaPage, SchemaRenderer } from 'view/kits/schema/page/schema-page.module.jsx';

import { TopicGroupList, TopicGroupViewer, TopicDetails } from 'view/topic/v1/topic-v1.module.jsx';

function SiteRouter() {
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
                    <Route path="/kits/editor/chameleon" exact={true} component={ChameleonEditor} />
                    <Route path="/kits/editor/markdown" exact={true} component={MarkdownEditor} />
                    <Route path="/kits/editor/difference" exact={true} component={DifferenceEditor} />
                    <Route path={["/notebook", "/notebook/:group", "/notebook/:group/:unique"]} exact={true} component={Notebook} />
                    <Route path="/kits/expression/maker/cron" exact={true} component={CronExpressionMaker} />
                    <Route path="/kits/expression/maker/docker" exact={true} component={DockerCommandMaker} />
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
                <ThemeContext.Provider value="default">
                    <ErrorBoundary>
                        <RecoilRoot>
                            <Suspense fallback={<Loading />}>
                                <SiteRouter />
                            </Suspense>
                        </RecoilRoot>
                    </ErrorBoundary>
                </ThemeContext.Provider>
            </HelmetProvider>
        </StrictMode>
    );
}