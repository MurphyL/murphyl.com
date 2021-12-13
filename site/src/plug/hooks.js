import { useEffect } from 'react'

import axios from 'axios';
import kindOf from 'kind-of';
import { nanoid } from 'nanoid'
import { JSONPath } from 'jsonpath-plus-browser';

import APP_JSON from 'data/cache/app.json';

export { default as useComponentSize } from '@rehooks/component-size';

export const unique = () => nanoid();

/**
 * JSONPath 工具类
 * 
 * @param {*} data 
 * @param {*} path 
 * @returns 
 */
export const jsonpath = (data = {}, path) => {
    return JSONPath({ path: (kindOf(path) === 'string' && path.trim().length > 0) ? path : '$', json: data, wrap: false })
};

const META_FILES = Object.fromEntries(jsonpath(APP_JSON, '$.*.*').map(({ __unique, __content }) => ([__unique, __content])));

/**
 * 读取站点元数据
 * 
 * @param {*} key 
 * @returns 
 */
export const useMetaInfo = (key) => META_FILES[key] ? META_FILES[key] : null;

/**
 * 设置页面标替
 * 
 * @param {*} title 
 */
export const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = (title ? (title.trim() + ' - ') : '') + process.env.REACT_APP_TITLE;
        return () => document.title = process.env.REACT_APP_TITLE;
    }, [title]);
};

const POSTIONS = {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
};

/**
 * 转换定位
 * 
 * @param {*} flags 
 * @returns 
 */
export function usePostions(flags = 'lb') {
    return flags.split('').map(flag => POSTIONS[flag]).filter(flag => flag);
};


export function useAJAX() {
    console.log(arguments);
};

export function useVercleInfo() {

};