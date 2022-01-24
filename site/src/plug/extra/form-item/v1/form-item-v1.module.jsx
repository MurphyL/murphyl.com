import React, { forwardRef, useMemo, useRef, useState } from 'react';

import { Link } from "react-router-dom";
import { nanoid } from 'nanoid';

import kindOf from 'kind-of';
import stripBOM from 'strip-bom';
import classNames from 'classnames';

import styles from './form-item-v1.module.css';

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
                    content: stripBOM(reader.result)
                });
            };
        } catch (e) {
            reject(`Load file(${value}) error: ${e.message}`);
        }
    })));
};

// https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms
// https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle
const FormItem = forwardRef(({ type = 'text', name, onChange, children, ...extra }, ref) => {
    const instance = useRef();
    const [value, setValue] = useState();
    const onValueChanged = useMemo(() => {
        const changeReferenceValue = (value) => (kindOf(onChange) === 'function') && onChange(value);
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
                    extra.multiple ? changeReferenceValue(files) : changeReferenceValue(files[0]);
                });
            } else {
                changeReferenceValue(value);
            }
        }
    }, [onChange]);
    const id = useMemo(() => nanoid(), []);
    // fieldset, lenged
    if (type === 'label') {
        return (
            <label id={id} className={classNames(styles.root, styles.label)} htmlFor={extra.htmlFor}>
                {children}
            </label>
        );
    } else if (type === 'select') {     // datalist
        return (
            <select id={id} className={classNames(styles.root, styles.select)} ref={ref} onChange={e => onValueChanged(e.target.value)}>
                {children}
            </select>
        );
    } else if (type === 'button') {
        return (
            <button id={id} className={classNames(styles.root, styles.button)} ref={instance} onClick={extra.onClick}>{children}</button>
        );
    } else if (type === 'file') {
        return (
            <label id={id} className={classNames(styles.root, styles.file)}>
                <input type="file" onChange={e => onValueChanged(e.target.value)} ref={instance} multiple={extra.multiple} accept={extra.accept} />
                <span className={styles.placeholder}>{value || extra.placeholder || PLACEHOLDERS[type]}</span>
            </label>
        );
    } else if (type === 'textarea') {
        return (
            <textarea id={id} className={classNames(styles.root, styles.textarea)} defaultValue={extra.value} placeholder={extra.placeholder} ref={instance} spellCheck="false" autoCorrect="false" onChange={e => { onValueChanged(e.target.value) }} />
        );
    } else if (type === 'checkbox') {
        return (
            <label className={classNames(styles.root, styles.input)} htmlFor={id} form-item-type="checkbox">
                {extra.label && <span className={styles.label}>{extra.label}</span>}
                <input id={id} name={id} type="checkbox" defaultChecked={extra.value} ref={instance} onChange={e => { onValueChanged(e.target.checked); }} />
            </label>
        );
    } else if (type === 'number') {
        return (
            <label className={classNames(styles.root, styles.input)} htmlFor={id} form-item-type="number">
                {extra.label && <span className={styles.label}>{extra.label}</span>}
                <input id={id} name={id} type="number" defaultValue={extra.value} ref={instance} onChange={e => onValueChanged(e.target.value)} />
            </label>
        );
    }
    return (
        <input id={id} name={name} type="text" defaultValue={extra.value} placeholder={extra.placeholder || name || 'text'} title={name || extra.placeholder} ref={instance} onChange={e => onValueChanged(e.target.value)} />
    );
});

FormItem.displayName = 'FormItem';

// label, lenged

export const Label = ({ type, ...props }) => <FormItem {...props} type="label" />;

export const Button = ({ type, ...props }) => <FormItem {...props} type="button" />;

export const Select = forwardRef(({ type, ...props }, ref) => <FormItem {...props} ref={ref} type="select" />);

export const TextInput = ({ type, ...props }) => <FormItem {...props} type="text" />;

export const NumberInput = ({ type, ...props }) => <FormItem {...props} type="number" />;

export const Checkbox = ({ type, ...props }) => <FormItem {...props} type="checkbox" />;

export const TextArea = ({ type, ...props }) => <FormItem {...props} type="textarea" />;

export const FileInput = forwardRef(({ type, ...props }, ref) => <FormItem {...props} ref={ref} type="file" />);

export const LinkButton = ({ to, type, children, ...props }) => <Link to={to}><Button {...props}>{children}</Button></Link>

export default FormItem;