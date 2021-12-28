import classNames from 'classnames';

import styles from './visual-item.module.css';

export const FormItem = ({ type }) => {
    return (
        <input className={classNames(styles['form-input'])} />
    );
};
