import React, { Suspense } from 'react';

import './loading.css';

export function Loading({ message }) {
    return (
        <div className="loading">
            <div className="spin">
                <img src="/image/squares.svg" alt="loading spin" />
            </div>
            <div>{ message || '加载中……' }</div>
        </div>
    );
};

export function dynamic(unique, props) {
    const LazyComponent = React.lazy(() => import(`pages/${unique}/${unique}`));
    return (
        <Suspense fallback={<Loading message="程序载入中……" />}>
            <div className={ unique }>
                <LazyComponent { ...props } />
            </div>
        </Suspense>
    );
};