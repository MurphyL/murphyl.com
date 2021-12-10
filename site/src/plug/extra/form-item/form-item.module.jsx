import React, { forwardRef, useMemo, useRef, useState } from 'react';

import kindOf from 'kind-of';
import classNames from 'classnames';

import styles from './form-item.module.css';

const PLACEHOLDERS = {
    file: '暂无文件……'
};

const FormItemWrapper = ({ type, children }) => {
    return (
        <label className={styles.root} form-input-type={type}>
            {children}
        </label>
    );
};


// https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle
const FormItem = forwardRef(({ type = 'text', name, onChange, children, ...extra }, ref) => {
    const instance = useRef(ref);
    const [value, setValue] = useState();
    const onValueChanged = useMemo(() => {
        const changeRefrenceValue = (value) => kindOf(onChange) === 'function' && onChange(value);
        return (value) => {
            if (type === 'file') {
                if (!value || !instance || !instance.current || instance.current.length === 0) {
                    return;
                }
                const files = Array.from(instance.current.files);
                setValue(files.map(file => file.name).join(', '));
                Promise.all(files.map((file) => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    try {
                        reader.readAsText(file);
                        reader.onload = () => {
                            resolve({
                                filename: file.name,
                                fileType: file.type,
                                content: reader.result
                            });
                        };
                    } catch (e) {
                        reject(`Load file(${value}) error: ${e.message}`);
                    }
                }))).then((files) => {
                    extra.multiple ? changeRefrenceValue(files) : changeRefrenceValue(files[0]);
                });
            } else {
                setValue(value);
                changeRefrenceValue(value);
            }
        }
    }, [onChange]);
    if (type === 'label') {
        return (
            <label className={classNames(styles.root, styles.label)} htmlFor={extra.htmlFor}>
                {children}
            </label>
        );
    } else if (type === 'select') {
        return (
            <select className={classNames(styles.root, styles.select)} ref={instance} onChange={e => onValueChanged(e.target.value)}>
                {children}
            </select>
        );
    } else if (type === 'button') {
        return (
            <button className={classNames(styles.root, styles.button)} ref={instance} onClick={extra.onClick}>{children}</button>
        );
    } else if (type === 'file') {
        return (
            <label className={classNames(styles.root, styles.file)}>
                <input type="file" onChange={e => onValueChanged(e.target.value)} ref={instance} multiple={extra.multiple} accept={extra.accept} />
                <span className={styles.placeholder}>{value || extra.placeholder || PLACEHOLDERS[type]}</span>
            </label>
        );
    }
    return (
        <div className={styles.root} form-item-type="text">
            <span className={styles.label}>{value || PLACEHOLDERS[type]}</span>
            <input type="text" ref={instance} onChange={e => onValueChanged(e.target.value)} />
        </div>
    );
});

FormItem.displayName = 'FormItem';

export const Label = ({ type, ...props }) => <FormItem {...props} type="label" />;

export const Button = ({ type, ...props }) => <FormItem {...props} type="button" />;

export const Select = ({ type, ...props }) => <FormItem {...props} type="select" />;

export const TextInput = ({ type, ...props }) => <FormItem {...props} type="text" />;

export const FileInput = ({ type, ...props }) => <FormItem {...props} type="file" />;

export default FormItem;