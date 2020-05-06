import React from 'react';

import { Route } from "react-router-dom";

import './loading.css';

export function Loading() {
    return (
        <div className="loading">
            <img src="/image/squares.svg" />
        </div>
    );
}

export function LoadedRouter(props) {
    return (
        <Route path={ props.path } exact={ props.exact || false }>
            <DynamicLoad page={ props.page } />
        </Route>
    )
}

export function DynamicLoad({ page }) {
    const LazyComponent = React.lazy(() => import(`../../pages/${page}/${page}`));
    return (
        <React.Suspense fallback={<Loading />}>
            <div className={ page }>
                <LazyComponent />
            </div>
        </React.Suspense>
    );
}