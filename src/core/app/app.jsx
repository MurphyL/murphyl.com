import React, { StrictMode } from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { dynamic } from '../loading/loading.jsx';
import { ErrorBoundary } from '../error/error.jsx';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

import './app.css';

function Main() {
    return (
        <main>
            <div className="container">
                <ErrorBoundary>
                    <Switch>
                        <Route path="/" exact={ true }>
                            { dynamic('home') }
                        </Route>
                        <Route path="/blog">
                            { dynamic('blog') }
                        </Route>
                        <Route path="/docs">
                            { dynamic('docs') }
                        </Route>
                        <Route path="/post/:unique">
                            { dynamic('post') }
                        </Route>
                        <Route path="/about">
                            { dynamic('about') }
                        </Route>
                        <Route>
                            <div>404</div>
                        </Route>
                    </Switch>
                </ErrorBoundary>
            </div>
        </main>
    )
}

export default function App() {
    return (
        <StrictMode>
            <ErrorBoundary>
                <BrowserRouter>
                    <Header />
                    <Main />
                    <Footer />
                </BrowserRouter>
            </ErrorBoundary>
        </StrictMode>
    )
};