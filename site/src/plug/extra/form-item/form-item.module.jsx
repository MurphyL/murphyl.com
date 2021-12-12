import React, { forwardRef, useMemo, useRef, useState } from 'react';

import { Link } from "react-router-dom";

import kindOf from 'kind-of';
import classNames from 'classnames';

import styles from './form-item.module.css';

const PLACEHOLDERS = {
    file: '暂无文件……'
};


const readFiles = async (fileList, limit) => {
    let files = Array.from(fileList);
    if (!isNaN(limit) && limit > 0) {
        files = files.slice(0, limit);
    }
    return Promise.all(files.map((file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        try {
            reader.readAsText(file);
            reader.onload = () => {
                resolve({
                    name: file.name,
                    type: file.type,
                    content: reader.result
                });
            };
        } catch (e) {
            reject(`Load file(${value}) error: ${e.message}`);
        }
    })));
};

// https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle
const FormItem = forwardRef(({ type = 'text', name, onChange, children, ...extra }, ref) => {
    const instance = useRef(ref);
    const [value, setValue] = useState();
    const onValueChanged = useMemo(() => {
        const changeRefrenceValue = (value) => (kindOf(onChange) === 'function') && onChange(value);
        return (value) => {
            if (type === 'file') {
                if (!value || !value.length) {
                    setValue('');
                    return;
                }
                if (!instance || !instance.current || instance.current.length === 0) {
                    return;
                }
                readFiles(instance.current.files, parseInt(extra.size)).then((files) => {
                    setValue(files.map(({ name }) => name).join(', '));
                    extra.multiple ? changeRefrenceValue(files) : changeRefrenceValue(files[0]);
                });
            } else {
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
    } else if (type === 'textarea') {
        return (
            <textarea className={classNames(styles.root, styles.textarea)} defaultValue={extra.value} placeholder={extra.placeholder} ref={instance} onChange={e => { onValueChanged(e.target.value) }} />
        );
    }
    return (
        <label className={classNames(styles.root, styles.input)} form-item-type="text">
            <input type="text" ref={instance} onChange={e => onValueChanged(e.target.value)} />
        </label>
    );
});

FormItem.displayName = 'FormItem';

export const Label = ({ type, ...props }) => <FormItem {...props} type="label" />;

export const Button = ({ type, ...props }) => <FormItem {...props} type="button" />;

export const Select = ({ type, ...props }) => <FormItem {...props} type="select" />;

export const TextInput = ({ type, ...props }) => <FormItem {...props} type="text" />;

export const TextArea = ({ type, ...props }) => <FormItem {...props} type="textarea" />;

export const FileInput = forwardRef(({ type, ...props }, ref) => <FormItem {...props} ref={ref} type="file" />);

export const LinkButton = ({ to, type, children, ...props }) => <Link to={to}><Button {...props}>{children}</Button></Link>

export default FormItem;