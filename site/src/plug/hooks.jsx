import { useEffect } from 'react'

import kindOf from 'kind-of';
import { JSONPath } from 'jsonpath-plus-browser';

export { default as useComponentSize } from '@rehooks/component-size';

export const useJSONPath = (data = {}, path) => {
    try { 
        return JSONPath({ path: (kindOf(path) === 'string' && path.trim().length > 0) ? path : '$', json: data, wrap: false })
    } catch(e) {
        return `Query error: ${e.message}`;
    }
    
};

export const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = (title ? (title.trim() + ' - ') : '') + process.env.REACT_APP_TITLE;
        return () => document.title = process.env.REACT_APP_TITLE;
    }, [title]);
};