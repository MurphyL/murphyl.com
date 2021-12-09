import { forwardRef, useMemo, useState } from 'react';

import kindOf from 'kind-of';

import styles from './form-input.module.css';

const PLACEHOLDERS = {
    file: '暂无文件……'
};

const FormInput = forwardRef(({ type = 'text', name, accept, placeholder, onChange }, instance) => {
    const [value, setValue] = useState();
    const listener = useMemo(() => {
        return (value) => {
            setValue(value);
            kindOf(onChange) === 'function' && onChange(value);
        }
    }, [onChange]);
    return (
        <label className={styles.root} form-input-type={type}>
            {(type !== 'file') && (
                <span className={styles.label}>{value || PLACEHOLDERS[type]}</span>
            )}
            <input type={type} ref={instance} placeholder={name} onChange={e => listener(e.target.value)} accept={accept} />
            {(type === 'file') && (
                <span className={styles.placeholder}>{value || placeholder || PLACEHOLDERS[type]}</span>
            )}
        </label>
    );
});

FormInput.displayName = 'FormInput';

export default FormInput;