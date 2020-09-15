import React, { Suspense } from 'react';

import { Spin } from 'antd';

import './loading.css';

export const Loading = ({ message }) => {
    return (
        <div className="loading">
            <div className="spin">
                <Spin />
            </div>
            <div className="message">{ message || '加载中' }</div>
        </div>
    );
};

export const Loadable = ({ id, status = 1, message, children }) => {
    switch(status) {
        case 0:
            return (
                <div id={ id }>{ children }</div>
            );
        case 1:
            return (
                <div id={ id }>
                    <Loading message={ message } />
                </div>
            );
        default:
            return (
                <div id={ id }>
                    <div className="error">
                        <span className="message">{ message }</span>
                    </div>
                </div>
            );
    }
};

export const lazy = (view) => {
	const LazyComponent = React.lazy(() => import(`pages/${view}`));
	return (
		<Suspense fallback={ <Loading /> } maxDuration={ 500 }>
			<LazyComponent />
		</Suspense>
	);
};