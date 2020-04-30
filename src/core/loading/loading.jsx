import React from 'react';

import { Route } from "react-router-dom";

export function Loading() {
    return (
        <div style={{ padding: '25vh 0 100px', textAlign: 'center' }}>loading...</div>
    );
}

export function LoadedRouter(props) {
    return (
        <Route path={ props.path} exact={ props.exact }>
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