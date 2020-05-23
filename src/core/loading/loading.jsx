import React, { Suspense } from 'react';

import './loading.css';

export function Loading() {
    return (
        <div className="loading">
            <img src="/image/squares.svg" alt="loading spin" />
        </div>
    );
};

export function dynamic(unique, props) {
    const LazyComponent = React.lazy(() => import(`pages/${unique}/${unique}`));
    return (
        <Suspense fallback={<Loading />}>
            <div className={ unique }>
                <LazyComponent { ...props } />
            </div>
        </Suspense>
    );
};