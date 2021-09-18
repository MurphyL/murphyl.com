import React, { StrictMode } from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ErrorBoundary } from 'plug/include/status/status.module.jsx';

import Home from 'view/home/home.module.jsx';

import Blog from 'view/blog/blog.module.jsx';
import Post from 'view/post/post.module.jsx';

import About from 'view/about/about.module.jsx';

import SchemaViewer from 'view/schema/viewer/schema-viewer.module.jsx';

export default function App() {
    return (
        <StrictMode>
            <ErrorBoundary>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact={true}>
                            <Home />
                        </Route>
                        <Route path="/blog">
                            <Blog />
                        </Route>
                        <Route path={['/docs', '/topics', '/collections']} exact={true}>
                            <SchemaViewer schema={[{
                                component: 'DriftNav',
                            }, {
                                component: 'SiteLayout',
                                children: [{
                                    component: 'div',
                                    text: 'Hello, world!'
                                }]
                            }]} />
                        </Route>
                        <Route path={['/topics/:unique', '/collections/:unique']}>
                            <SchemaViewer schema={[{
                                component: 'DriftNav',
                            }, {
                                component: 'SiteLayout',
                                children: [{
                                    component: 'div',
                                    text: 'Hello, world!'
                                }]
                            }]} />
                        </Route>
                        <Route path="/post/:unique">
                            <Post />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route>
                            <div>404</div>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </ErrorBoundary>
        </StrictMode>
    )
};