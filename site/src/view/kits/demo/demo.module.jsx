import React, { Children, Fragment } from "react";

import { Outlet } from "react-router-dom";

import { FormItem } from 'plug/extra/visual-item/visual-item.module';

import { Loading } from 'plug/extra/status/status.module';
import DataTable, { DataFrame } from 'plug/extra/data-table/data-table.module';

import styles from './demo.module.css';

const DemoGroup = ({ children, name }) => {
    return (
        <fieldset className={styles.group}>
            <legend>
                <b>{name || 'NAMED'}</b>
            </legend>
            {(Children.count(children)) ? (
                <div className={styles.container}>
                    {(Children.map(children, (child, index) => (
                        <div className={styles.item} key={index}>{child}</div>
                    )))}
                </div>
            ) : <div>Empty group!</div>}
        </fieldset>
    );
};

const FormItems = () => {
    return (
        <Fragment>
            <FormItem />
            <FormItem />
            <FormItem />
            <FormItem />
        </Fragment>
    );
};

function DemoLayout() {
    return (
        <div className={styles.root}>
            <Outlet />
        </div>
    );
}

export default {
    path: 'demo',
    element: <DemoLayout />,
    children: [{
        index: true,
        element: <div>home</div>
    }, {
        path: 'loading',
        element: (
            <DemoGroup name="Loading">
                <Loading type="inline" />
                <Loading type="inline" color="red" />
                <Loading type="inline" color="blue" />
                <Loading type="inline" message="hello world" />
            </DemoGroup>
        )
    }, {
        path: 'form-item',
        element: (
            <DemoGroup name="Form Item">
                <FormItems />
            </DemoGroup>
        )
    }, {
        path: 'data',
        element: <Outlet />,
        children: [{
            path: 'table',
            element: (
                <DemoGroup>
                    <DataTable data={[{ name: 'ID', unique: 'unique' }]} />
                </DemoGroup>
            )
        }, {
            path: 'frame',
            element: (
                <DemoGroup>
                    <DataFrame />
                </DemoGroup>
            )
        }]
    }]
}