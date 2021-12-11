
import classNames from 'classnames';

import { usePostions } from 'plug/hooks';

import styles from './drift-toolbar.module.css';

export default function DriftToolbar({ className, postion = 'lb', children }) {
    const postionClasses = usePostions(postion).map(postion => styles[postion]);
    return (
        <div className={classNames(styles.root, postionClasses, className)}>
            { children }
        </div>
    );
}