import React, { StrictMode, Suspense } from 'react';

import { Provider } from 'react-redux';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import murphStore from '../../utils/murph_store';

import { Loading } from '../loading/loading.jsx';
import { ErrorBoundary } from '../error/error.jsx';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

import './app.css';

const Layout = ({ view, custom = false }) => {
    const LazyComponent = React.lazy(() => import(`pages/${view}`));
    return (
        <Suspense fallback={<Loading message="程序载入中……" />}>
            { !custom && <Header /> }
            <main className={ custom ? 'custom' : 'container' } uri={ view }>
                <LazyComponent />
            </main>
            { !custom && <Footer /> }    
        </Suspense>
    )
}

export default function App() {
    return (
        <StrictMode>
            <Provider store={ murphStore }>
                <ErrorBoundary>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact={ true }>
                                <Layout view="home/home" />
                            </Route>
                            <Route path="/blog">
                                <Layout view="blog/blog" />
                            </Route>
                            <Route path="/wmp/writer">
                                <Layout view="wmp/writer/wmp_writer" custom={ true } />
                            </Route>
                            <Route path="/post/:unique">
                                <Layout view="post/post" />
                            </Route>
                            <Route path="/about">
                                <Layout view="about/about" />
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