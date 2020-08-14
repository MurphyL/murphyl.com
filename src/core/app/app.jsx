import React, { StrictMode, Fragment } from 'react';

import { Provider } from 'react-redux';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import murphStore from '../../utils/murph_store';

import { ErrorBoundary } from '../error/error.jsx';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

// import { Loading } from '../loading/loading.jsx';

import About from '../../pages/about/about.jsx';
import Home from '../../pages/home/home.jsx';
import Post from '../../pages/post/post.jsx';

import WmpWriter from '../../pages/wmp/writer/wmp_writer.jsx';

import BlogList from '../../pages/blog/list/blog_list.jsx';
import BlogAchive from '../../pages/blog/achive/blog_achive.jsx';



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

const RouteItems = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={ true }>
                    <NormalLayout View={ Home } />
                </Route>
                <Route path="/blog">
                    <NormalLayout View={ BlogList } />
                </Route>
                <Route path="/all">
                    <NormalLayout View={ BlogAchive } />
                </Route>
                <Route path="/achive">
                    <NormalLayout View={ BlogAchive } />
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
    );
};

const App = () => {
    return (
        <StrictMode>
            <Provider store={ murphStore }>
                <ErrorBoundary>
                    <RouteItems />
                </ErrorBoundary>
            </Provider>
        </StrictMode>
    )
};

export default App;