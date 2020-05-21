import React, { lazy, Suspense } from 'react';

import { Route } from "react-router-dom";

import './loading.css';

export function Loading() {
    return (
        <div className="loading">
            <img src="/image/squares.svg" alt="loading spin" />
        </div>
    );
}

export function LoadableRoute(props) {
    return (
        <Route path={ props.path } exact={ props.exact || false }>
            <Loadable page={ props.page } />
        </Route>
    )
}

export function Loadable({ page }) {
    const LazyComponent = lazy(() => import(`../../pages/${page}/${page}`));
    return (
        <Suspense fallback={<Loading />}>
            <div className={ page }>
                <LazyComponent />
            </div>
        </Suspense>
    );
}