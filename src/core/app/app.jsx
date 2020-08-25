import React, { Component, StrictMode, useState } from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { lazy } from '../loading/loading.jsx';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

import './app.css';

const ThemeChanger = React.memo(({ theme, setTheme }) => {
    return (
        <span onClick={ (e) => setTheme(!theme) }>
            { theme ? (
                <svg viewBox="0 0 16 16" className="bi bi-brightness-high" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                </svg>
            ) : (
                <svg viewBox="0 0 16 16" className="bi bi-brightness-alt-high-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 11a4 4 0 1 1 8 0 .5.5 0 0 1-.5.5h-7A.5.5 0 0 1 4 11zm4-8a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM4.464 7.464a.5.5 0 0 1-.707 0L2.343 6.05a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707z"/>
                </svg>
            ) }
        </span>
    );
});

const GithubLogo = (theme) => {
    return (
        <svg className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
    );
}

const NormalLoadable = ({ view, theme, setTheme }) => {
    return (
        <div className={ theme ? 'light' : 'dark' }>
            <Header>
                <li className="github-logo">
                    <a href={`https://github.com/${ process.env.REACT_APP_GITHUB }`} target="_blank" rel="noopener noreferrer">
                        <GithubLogo />
                    </a>
                </li>
                <li className="theme-changer">
                    <ThemeChanger { ...{ theme, setTheme } } />
                </li>
            </Header>
            <main>
                <div className="container">
                    { lazy(view) }
                </div>
            </main>
            <Footer />
        </div>
    );
};

const RouteItems = () => {
    const [ theme, setTheme ] = useState(true);
    const themeSetter = { theme, setTheme };
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={ true }>
                    <NormalLoadable { ...themeSetter } view="home/home" />
                </Route>
                <Route path="/blog">
                    <NormalLoadable { ...themeSetter } view="blog/list/blog_list" />
                </Route>
                <Route path="/post/:unique">
                    <NormalLoadable { ...themeSetter } view="blog/post/blog_post" />
                </Route>
                <Route path="/tag/:unique">
                    <NormalLoadable { ...themeSetter } view="blog/tag/blog_tag" />
                </Route>
                <Route path="/all">
                    <NormalLoadable { ...themeSetter } view="blog/achive/blog_achive" />
                </Route>
                <Route path="/achive">
                    <NormalLoadable { ...themeSetter } view="blog/achive/blog_achive" />
                </Route>
                <Route path="/author/:unique">
                    <NormalLoadable { ...themeSetter } view="blog/author/blog_author" />
                </Route>
                <Route path="/about">
                    <NormalLoadable { ...themeSetter } view="about/about" />
                </Route>
                <Route path="/wmp/writer">
                    { lazy('wmp/writer/wmp_writer') }
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