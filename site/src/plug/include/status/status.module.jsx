import React, { Component } from 'react';

import styles from './status.module.css';

export const Loading = ({ message }) => {
    return (
        <div className={styles.loading}>
            <div className="spin">
                <img src="/image/squares.svg" alt="loading spin" />
            </div>
            <div>{ message || '加载中……' }</div>
        </div>
    );
};

export const Error = ({ message }) => {
	return (
		<div className={styles.error}>
			<span>{ message }</span>
		</div>
	);
};

export class ErrorBoundary extends Component {

	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
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