import React from 'react';
import TOML from '@iarna/toml';
import * as matter from 'gray-matter';

import { Error } from 'plug/include/status/status.module.jsx';

export const resolveToml = (promise, label = '') => {
    return promise.then(({ status, data }) => {
        return (status === 200) ? TOML.parse(data) : { loading: <Error message={ `请求${label}数据出错` } /> };
    }).catch(err => {
        console.log('调用后端接口出错：', err.message);
        return { loading: <Error message={ `请求${label}数据出错，调用接口出错` } /> };
    });
};

export const resolveMarkdown = (promise, label = '') => {
    return promise.then(({ status, data }) => {
        if(status === 200) {
            const { data: meta, content } = matter(data);
            return {meta, content };
        } else {
            return { loading: <Error message={ `请求${label}数据出错` } /> };
        }
    }).catch(err => {
        console.log('调用后端接口出错：', err.message);
        return { loading: <Error message={ `请求${label}数据出错，调用接口出错` } /> };
    });
}