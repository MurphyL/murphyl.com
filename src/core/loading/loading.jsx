import React, { Suspense } from 'react';

import './loading.css';

export const Loading = ({ message }) => {
    return (
        <div className="loading">
            <div className="spin">
                <img src="/image/squares.svg" alt="loading spin" />
            </div>
            <div className="message">{ message || '加载中' }</div>
        </div>
    );
};

export const lazy = (view) => {
	const LazyComponent = React.lazy(() => import(`pages/${view}`));
	return (
		<Suspense fallback={ <Loading /> } maxDuration={ 500 }>
			<LazyComponent />
		</Suspense>
	);
};