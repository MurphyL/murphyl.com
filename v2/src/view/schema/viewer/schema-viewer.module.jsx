import React from 'react';

import ReactJsonSchema from 'react-json-schema';

import options from 'plug/extra/schema/schema-options.jsx';

import styles from './schema-viewer.module.css';

const view = new ReactJsonSchema();

view.setComponentMap(options || {});

export default function SchemaViewer({ schema }) {
    console.log('schema', schema);
    return (
        <div className={styles.root}>
            {view.parseSchema(schema || {
                component: 'div',
                className: styles.empty
            })}
        </div>
    );
}