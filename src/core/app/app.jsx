import React, { Component, Fragment, StrictMode } from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { lazy } from '../loading/loading.jsx';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

import './app.css';

const NormalLoadable = ({ view }) => {
    return (
        <Fragment>
            <Header />
            <main>
                <div className="container">
                    { lazy(view) }
                </div>
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
                    <NormalLoadable view="home/home" />
                </Route>
                <Route path="/blog">
                    <NormalLoadable view="blog/list/blog_list" />
                </Route>
                <Route path="/post/:unique">
                    <NormalLoadable view="blog/post/blog_post" />
                </Route>
                <Route path="/tag/:unique">
                    <NormalLoadable view="blog/tag/blog_tag" />
                </Route>
                <Route path="/all">
                    <NormalLoadable view="blog/achive/blog_achive" />
                </Route>
                <Route path="/achive">
                    <NormalLoadable view="blog/achive/blog_achive" />
                </Route>
                <Route path="/author/:unique">
                    <NormalLoadable view="blog/author/blog_author" />
                </Route>
                <Route path="/about">
                    <NormalLoadable view="about/about" />
                </Route>
                <Route path="/wmp/writer">
                    { lazy('wmp/writer/wmp_writer') }
                </Route>
                <Route path="/contact">
                    <NormalLoadable view="murph/contact/contact" />
                </Route>
                <Route>
                    <div>404</div>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h3>好像出错了！</h3>;
        }
        return this.props.children; 
    }
}

const App = () => {
    return (
        <StrictMode>
            <ErrorBoundary>
                <RouteItems />
            </ErrorBoundary>
        </StrictMode>
    )
};

export default App;