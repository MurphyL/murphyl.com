import React, { Component, Suspense } from 'react';

import styles from './status.module.css';

export const Loading = ({ message, color }) => {
    const stylish = {
        ['--loading-theme-color']: color
    };
    return (
        <div className={styles.loading} style={stylish}>
            <div className={styles.instance}>
                <div className={styles.dots}>
                    <i className={styles.dot}></i>
                    <i className={styles.dot}></i>
                    <i className={styles.dot}></i>
                </div>
                <div className={styles.message}>{message || '加载中…'}</div>
            </div>
        </div>
    );
};

export const Error = ({ message }) => {
    return (
        <div className={styles.error}>
            <span>{message}</span>
        </div>
    );
};

export const Dynamic = ({ children }) => {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    );
};

export class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h3>好像出错了！</h3>;
        }
        return this.props.children;
    }
};