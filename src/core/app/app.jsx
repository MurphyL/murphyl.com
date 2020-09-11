import React, { Component, StrictMode } from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { lazy } from '../loading/loading.jsx';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

import './app.css';
import './mark.css';

const NormalLoadable = ({ view }) => {
    return (
        <div className="theme light">
            <Header />
            <main>
                <div className="container">
                    { lazy(view) }
                </div>
            </main>
            <Footer />
        </div>
    );
};

const CustomLoadable = ({ view }) => {
    return (
        <div className="custom">
            { lazy(view) }
        </div>
    );
};

const RouteItems = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={ true }>
                    <NormalLoadable view="home/home" />
                </Route>
                <Route path="/about">
                    <NormalLoadable view="about/about" />
                </Route>
                <Route path={[ '/blog/:num', '/blog' ]}>
                    <NormalLoadable view="blog/list/blog_list" />
                </Route>
                <Route path="/post/:number">
                    <NormalLoadable view="blog/post/blog_post" />
                </Route>
                <Route path={[ '/all', '/achive' ]}>
                    <NormalLoadable view="blog/achive/blog_achive" />
                </Route>
                <Route path="/author/:unique">
                    <NormalLoadable view="blog/author/blog_author" />
                </Route>
                <Route path="/explorer">
                    <CustomLoadable view="murph/explorer/explorer" />
                </Route>
                <Route path="/code/snippets">
                    <CustomLoadable view="murph/snippets/snippets" />
                </Route>
                <Route path="/code/board/:unique">
                    <CustomLoadable view="murph/board/code_board" />
                </Route>
                <Route path={[ '/win10', '/windows10' ]}>
                    <CustomLoadable view="murph/web_os/windows10" />
                </Route>
                <Route path="/contact">
                    <NormalLoadable view="murph/contact/contact" />
                </Route>
                <Route path="/x/:number">
                    <CustomLoadable view="anon/anon_object" />
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