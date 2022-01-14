import { useEffect, useMemo } from 'react';

import kindOf from 'kind-of';
import { nanoid } from 'nanoid';

import { JSONPath } from 'jsonpath-plus-browser';

import APP_JSON from 'data/cache/app.json';

export const useId = () => useMemo(() => nanoid(), []);

/**
 * JSONPath 工具类
 * 
 * @param {*} data 
 * @param {*} path 
 * @returns 
 */
export const useJSONPath = (data = {}, path) => {
    const jp = useMemo(() => {
        return (kindOf(path) === 'string' && path.trim().length > 0) ? path : '$';
    }, [path]);
    return JSONPath({ path: jp, json: data, wrap: false });
};



/**
 * 读取站点元数据
 * 
 * @param {*} key 
 * @returns 
 */
export const useMetaInfo = (key) => {
    const entries = useJSONPath(APP_JSON, '$.*.*');
    const metaFiles = useMemo(() => {
        return Object.fromEntries(entries.map(({ __unique, __content }) => {
            return [__unique, __content];
        }));
    }, [entries]);
    return (metaFiles && metaFiles[key]) ? metaFiles[key] : null;
};

/**
 * 设置页面标替
 * 
 * @param {*} title 
 */
export const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = (title ? (title.trim() + ' - ') : '') + process.env.REACT_APP_TITLE;
        return () => {
            document.title = process.env.REACT_APP_TITLE;
        };
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
    return useMemo(() => flags.split('').map(flag => POSTIONS[flag]).filter(flag => flag), [flags]);
};


export function useAJAX() {
    console.log(arguments);
};

export function useVercleInfo() {

};