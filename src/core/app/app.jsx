import React, { Component, Fragment, StrictMode } from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

import About from '../../pages/about/about.jsx';
import Home from '../../pages/home/home.jsx';
import Post from '../../pages/post/post.jsx';

import WmpWriter from '../../pages/wmp/writer/wmp_writer.jsx';

import Sudoku from '../../pages/murph/sudoku/sudoku.jsx';

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
                <Route path="/about">
                    <NormalLayout View={ About } />
                </Route>
                <Route path="/wmp/writer">
                    <WmpWriter/>
                </Route>
                <Route path="/post/:unique">
                    <NormalLayout View={ Post } />
                </Route>
                <Route path="/sudoku">
                    <Sudoku/>
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