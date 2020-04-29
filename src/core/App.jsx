import React, { StrictMode } from 'react';

import Loading from './loading/loading.jsx';

import Header from './header/header.jsx';
import Footer from './footer/footer.jsx';

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
    // console.log(process.env);
    return (
        <StrictMode>
            <BrowserRouter>
                <Header title="咖啡·薄荷" />
                <main>
                    <div className="container">
                        <Switch>
                            <Route exact path="/">
                                <Loading target="home" />
                            </Route>
                            <Route path="/blog" >
                                <Loading target="blog" />
                            </Route>
                            <Route path="/about" >
                                <Loading target="about" />
                            </Route>
                            <Route path="/post/:unique" >
                                <Loading target="post" />
                            </Route>
                            <Route>
                                <div>404</div>
                            </Route>
                        </Switch>
                    </div>
                </main>
                <Footer title="咖啡·薄荷" />
            </BrowserRouter>
        </StrictMode>
    );
}

export default App;
