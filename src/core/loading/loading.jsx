import React, { Suspense } from 'react';

import './loading.css';

export const Loading = ({ message }) => {
    return (
        <div className="loading">
            <div className="spin">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-squares">
                    <path fill="none" className="bk" d="M0 0h100v100H0z"/>
                    <path fill="#ccc" className="sq" d="M15 15h20v20H15z">
                        <animate attributeName="fill" from="#cccccc" to="#999999" repeatCount="indefinite" dur="1s" begin="0.0s" values="#999999;#999999;#cccccc;#cccccc" keyTimes="0;0.1;0.2;1"/>
                    </path>
                    <path fill="#ccc" className="sq" d="M40 15h20v20H40z">
                        <animate attributeName="fill" from="#cccccc" to="#999999" repeatCount="indefinite" dur="1s" begin="0.125s" values="#999999;#999999;#cccccc;#cccccc" keyTimes="0;0.1;0.2;1"/>
                    </path>
                    <path fill="#ccc" className="sq" d="M65 15h20v20H65z">
                        <animate attributeName="fill" from="#cccccc" to="#999999" repeatCount="indefinite" dur="1s" begin="0.25s" values="#999999;#999999;#cccccc;#cccccc" keyTimes="0;0.1;0.2;1"/>
                    </path>
                    <path fill="#ccc" className="sq" d="M15 40h20v20H15z">
                        <animate attributeName="fill" from="#cccccc" to="#999999" repeatCount="indefinite" dur="1s" begin="0.875s" values="#999999;#999999;#cccccc;#cccccc" keyTimes="0;0.1;0.2;1"/>
                    </path>
                    <path fill="#ccc" className="sq" d="M65 40h20v20H65z">
                        <animate attributeName="fill" from="#cccccc" to="#999999" repeatCount="indefinite" dur="1s" begin=".375" values="#999999;#999999;#cccccc;#cccccc" keyTimes="0;0.1;0.2;1"/>
                    </path>
                    <path fill="#ccc" className="sq" d="M15 65h20v20H15z">
                        <animate attributeName="fill" from="#cccccc" to="#999999" repeatCount="indefinite" dur="1s" begin="0.75s" values="#999999;#999999;#cccccc;#cccccc" keyTimes="0;0.1;0.2;1"/>
                    </path>
                    <path fill="#ccc" className="sq" d="M40 65h20v20H40z">
                        <animate attributeName="fill" from="#cccccc" to="#999999" repeatCount="indefinite" dur="1s" begin="0.625s" values="#999999;#999999;#cccccc;#cccccc" keyTimes="0;0.1;0.2;1"/>
                    </path>
                    <path fill="#ccc" className="sq" d="M65 65h20v20H65z">
                        <animate attributeName="fill" from="#cccccc" to="#999999" repeatCount="indefinite" dur="1s" begin="0.5s" values="#999999;#999999;#cccccc;#cccccc" keyTimes="0;0.1;0.2;1"/>
                    </path>
                </svg>
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