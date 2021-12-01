
import classNames from 'classnames';

import { resolvePostion } from 'plug/utils/postion-utils';

import styles from './drift-toolbar.module.css';

export default function DriftToolbar({ className, postion = 'lb', children }) {
    const postionClasses = resolvePostion(postion).map(postion => styles[postion]);
    return (
        <div className={classNames(styles.root, postionClasses, className)}>
            { children }
        </div>
    );
}