import React from 'react';

import './loading.css';

export const Loading = ({ message }) => {
    return (
        <div className="loading">
            <div className="spin">
                <img src="/image/squares.svg" alt="loading spin" />
            </div>
            <div>{ message || '加载中……' }</div>
        </div>
    );
};

