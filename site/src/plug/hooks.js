import { useEffect } from 'react'

import axios from 'axios';
import kindOf from 'kind-of';
import { JSONPath } from 'jsonpath-plus-browser';

import APP_JSON from 'data/cache/app.json';

export { default as useComponentSize } from '@rehooks/component-size';

export const useJSONPath = (data = {}, path) => {
    try {
        return JSONPath({ path: (kindOf(path) === 'string' && path.trim().length > 0) ? path : '$', json: data, wrap: false })
    } catch (e) {
        return `Query error: ${e.message}`;
    }
};

const META_FILES = Object.fromEntries(useJSONPath(APP_JSON, '$.*.*').map(({ __unique, __content }) => ([__unique, __content])));

export const useMetaInfo = (key) => META_FILES[key] ? META_FILES[key] : null;

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

export function usePostions(flags = 'lb') {
    return flags.split('').map(flag => POSTIONS[flag]).filter(flag => flag);
};


export function useAJAX() {
    console.log(arguments);
};

export function useVercleInfo() {

};