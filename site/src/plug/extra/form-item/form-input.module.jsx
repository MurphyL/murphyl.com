import { forwardRef, useMemo, useState } from 'react';

import kindOf from 'kind-of';

import styles from './form-input.module.css';

const FormInput = forwardRef(({ type = 'text', name, accept, onChange }, instance) => {
    const [ value, setValue ] = useState();
    const listener = useMemo(() => {
        return (value) => {
            setValue(value);
            kindOf(onChange) === 'function' && onChange(value);
        }
    }, [onChange]);
    return (
        <label className={styles.root} form-input-type={type}>
            {name && <span>{value || name}</span>}
            <input type={type} ref={instance} placeholder={name} onChange={e => listener(e.target.value)} accept={accept} />
        </label>
    );
});

FormInput.displayName = 'FormInput';

export default FormInput;