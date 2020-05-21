import React, { StrictMode } from 'react';

import { LoadableRoute } from '../loading/loading.jsx';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import './app.css';

function Main() {
    return (
        <main>
            <div className="container">
                <Switch>
                    <LoadableRoute path="/" page="home" exact={true} />
                    <LoadableRoute path="/blog" page="blog" />
                    <LoadableRoute path="/about" page="about" />
                    <LoadableRoute path="/post/:unique" page="post" />
                    <Route>
                        <div>404</div>
                    </Route>
                </Switch>
            </div>
        </main>
    )
}

export default function App() {
    return (
        <StrictMode>
            <BrowserRouter>
                <Header />
                <Main />
                <Footer />
            </BrowserRouter>
        </StrictMode>
    )
};