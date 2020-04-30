import React, { StrictMode } from 'react';

import { LoadedRouter } from './loading/loading.jsx';

import Header from './header/header.jsx';
import Footer from './footer/footer.jsx';

import { BrowserRouter, Switch, Route } from "react-router-dom";

function Board() {
    return (
        <main>
            <div className="container">
                <Switch>
                    <LoadedRouter path="/" page="home" exact={true} />
                    <LoadedRouter path="/blog" page="blog" />
                    <LoadedRouter path="/about" page="about" />
                    <LoadedRouter path="/post/:unique" page="post" />
                    <Route>
                        <div>404</div>
                    </Route>
                </Switch>
            </div>
        </main>
    )
}

export default function App() {
    console.log(process.env);
    return (
        <StrictMode>
            <BrowserRouter>
                <Header />
                <Board />
                <Footer />
            </BrowserRouter>
        </StrictMode>
    );
}