import React, { StrictMode, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ErrorBoundary, Loading } from 'plug/include/status/status.module.jsx';

import SiteLayout from "plug/template/site-layout/site-layout.module.jsx";

import Home from 'view/home/home.module.jsx';

import Blog from 'view/blog/blog.module.jsx';
import Post from 'view/post/post.module.jsx';

import Snippet from 'view/kits/snippet/snippet.module.jsx';

import About from 'view/about/about.module.jsx';

import { TopicList, TopicPost } from 'view/topic/topic.module.jsx';

export default function App() {
    return (
        <StrictMode>
            <HelmetProvider>
                <ErrorBoundary>
                    <RecoilRoot>
                        <BrowserRouter>
                            <Switch>
                                <Route path="/" exact={true} component={Home} />
                                <Route path="/blog" exact={true} component={Blog} />
                                <Route path="/post/:unique" exact={true} component={Post} />
                                <Route path="/about" exact={true} component={About} />
                                <Route path={['/topics', '/collections']} exact={true}>
                                    <SiteLayout>
                                        <Suspense fallback={<Loading />}>
                                            <TopicList />
                                        </Suspense>
                                    </SiteLayout>
                                </Route>
                                <Route path={['/topics/:group/:unique', '/collections/:group/:unique']} exact={true}>
                                    <SiteLayout>
                                        <Suspense fallback={<Loading />}>
                                            <TopicPost />
                                        </Suspense>
                                    </SiteLayout>
                                </Route>
                                <Route path="/snippet" exact={true} component={Snippet} />
                                <Route>404</Route>
                            </Switch>
                        </BrowserRouter>
                    </RecoilRoot>
                </ErrorBoundary>
            </HelmetProvider>
        </StrictMode>
    )
};