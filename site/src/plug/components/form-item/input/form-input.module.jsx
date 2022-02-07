import { memo, useState } from 'react';

import { pascalCase } from "pascal-case";
import classNames from 'classnames';

import { useId } from 'plug/hooks';

import styles from './form-input.module.css';

const FormInput = memo(({ type = 'text', name: fieldName, defaultValue, value: initValue, required, inline, onChange }) => {
    const fieldId = `form-item-${useId()}`;
    const [focused, sedFocused] = useState(true); // TODO 用于仿照 MUI 的效果
    const name = fieldName || `${pascalCase(type)} Field`;
    return (
        <div className={classNames(styles.root, { [styles.inline]: inline })}>
            <div className={classNames(styles.container, { [styles.focused]: focused })}>
                <span className={styles.label}>{name} {required && (<span>*</span>)}</span>
                {/* onFocus={() => sedFocused(true)} onBlur={() => sedFocused(((defaultValue || initValue) !== undefined) || false)} */}
                <input id={fieldId} defaultValue={defaultValue || initValue} type={type} placeholder={name} />
            </div>
        </div>
    );
});


FormInput.displayName = 'FormInput';

export default FormInput;