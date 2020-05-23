import React, { StrictMode, useEffect, useState } from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Loading, dynamic } from '../loading/loading.jsx';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

import { ajaxGet } from '../../utils/rest_client';

import './app.css';

function Main() {
    const [ state, setState ] = useState({ code: -1 });
    useEffect(() => {
        ajaxGet('coffee.json').then(res => {
            const { code, payload } = res;
            const { docs, blog, dict } = payload || {};
            setState({ code, docs, blog, dict  })
        });
    }, []);
    if(state.code === 1) {
        return <div>error</div>
    }
    if(state.code === -1) {
        return <Loading />
    }
    const { docs, blog, dict } = state;
    return (
        <main>
            <div className="container">
                <Switch>
                    <Route path="/" exact={ true }>
                        { dynamic('home') }
                    </Route>
                    <Route path="/blog">
                        { dynamic('blog', { blog, dict }) }
                    </Route>
                    <Route path="/docs">
                        { dynamic('docs', { docs, dict }) }
                    </Route>
                    <Route path="/post/:unique">
                        { dynamic('post', { dict }) }
                    </Route>
                    <Route path="/about">
                        { dynamic('about') }
                    </Route>
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