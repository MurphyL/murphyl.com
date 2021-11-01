import { createElement } from 'react';


import styles from './dynamic-list.module.css';

export default function DynamicList() {
    return createElement('ul', { className: styles.root }, null);
}