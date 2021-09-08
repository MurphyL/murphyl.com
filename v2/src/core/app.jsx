import {StrictMode} from 'react';

import { Router, Route, Switch } from "wouter";

import Home from 'view/home/home.view.jsx';
import Blog from 'view/blog/blog.view.jsx';
import Database from 'view/db/db.view.jsx';
import Group from 'view/group/group.view.jsx';
import Crypto from 'view/extra/crypto/crypto.view.jsx';

export default function App() {
    return (
        <StrictMode>
            <Router>
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/blog" component={Blog} />
                    <Route path="/data" component={Database} />
                    <Route path="/group/:name" component={Group} />
                    <Route path="/extra/crypto" component={Crypto} />
                    <Route>404, Not Found!</Route>
                </Switch>
            </Router>
        </StrictMode>
    );
};