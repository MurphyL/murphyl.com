import React, { StrictMode, Fragment } from 'react';

import { Provider } from 'react-redux';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import murphStore from '../../utils/murph_store';

import { ErrorBoundary } from '../error/error.jsx';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

// import { Loading } from '../loading/loading.jsx';

import About from '../../pages/about/about';
import Home from '../../pages/home/home';
import Blog from '../../pages/blog/blog';
import Post from '../../pages/post/post';

import WmpWriter from '../../pages/wmp/writer/wmp_writer';

import './app.css';

const NormalLayout = ({ View }) => {
    return (
        <Fragment>
            <Header />
            <main className="container">
                <View />
            </main>
            <Footer />
        </Fragment>
    );
};

export default const App = () => {
    return (
        <StrictMode>
            <Provider store={ murphStore }>
                <ErrorBoundary>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact={ true }>
                                <NormalLayout View={ Home } />
                            </Route>
                            <Route path="/blog">
                                <NormalLayout View={ Blog } />
                            </Route>
                            <Route path="/wmp/writer">
                                <WmpWriter/>
                            </Route>
                            <Route path="/post/:unique">
                                <NormalLayout View={ Post } />
                            </Route>
                            <Route path="/about">
                                <NormalLayout View={ About } />
                            </Route>
                            <Route>
                                <div>404</div>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </ErrorBoundary>
            </Provider>
        </StrictMode>
    )
};