import React, { Fragment, Suspense } from 'react';
import { useParams } from "react-router-dom";

import { Helmet } from 'react-helmet-async';
import { selectorFamily, useRecoilValue } from 'recoil';

import axios from 'axios';
import TOML from '@iarna/toml';

import ReactJsonSchema from 'react-json-schema';

import options from 'plug/schema/schema-options.jsx';

import styles from './schema-viewer.module.css';

const schemaQuery = selectorFamily({
    key: 'schema',
    get: (unique) => () => axios.get(`/data/toml/schema/${unique}.toml`).then(({ status, data }) => {
        return status === 200 ? TOML.parse(data) : null;
    }).catch(err => {
        console.error('Schema 数据查询出错：', err);
        return null;
    })
});

const view = new ReactJsonSchema();

view.setComponentMap(options || {});

export default function SchemaViewer({ schema }) {
    console.log('react schema', schema);
    return (
        <Fragment>
            <Helmet>
                <title>动态页面 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div className={styles.root}>
                {view.parseSchema(schema || {
                    component: 'div',
                    className: styles.empty
                })}
            </div>
        </Fragment>
    );
};


export function LazySchemaViewer() {
    const { unique } = useParams();
    const schema = useRecoilValue(schemaQuery(unique));
    return schema ? <SchemaViewer schema={schema} /> : `加载错误：${unique}`
}

export function DynamicSchemaViewer() {
    return (
        <Suspense fallback={<div>loading……</div>}>
            <LazySchemaViewer />
        </Suspense>
    );
}