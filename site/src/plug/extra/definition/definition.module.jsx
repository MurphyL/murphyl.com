import React from 'react';

import styles from './definition.module.css';

export const Title = ({ level = 'h2', children }) => {
    return React.createElement(level, { className: styles.title }, children);
}

export const Paragraph = ({ children }) => {
    if (children && Array.isArray(children)) {
        if (children[0] && children[0].type === 'img') {
            return (
                <p className={styles.image}>{children}</p>
            )
        }
    }
    return (
        <p className={styles.paragraph}>{children}</p>
    );
};

export const Prepare = ({ children }) => {
    return (
        <div className={styles.prepare}>{children}</div>
    );
};