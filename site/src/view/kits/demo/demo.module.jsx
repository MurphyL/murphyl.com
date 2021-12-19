import React from "react";

import { Outlet } from "react-router-dom";

import * as icons from '@icons-pack/react-simple-icons';

import { Loading } from 'plug/extra/status/status.module';
import DataTable, { DataFrame } from 'plug/extra/data-table/data-table.module';

function DemoGroup({ width, children }) {
    return (
        <div style={{ padding: '10px', width: (isNaN(width) ? width : `${width * 100}%`) }}>
            <div style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '3px' }}>
                {(React.Children.count(children) > 0) ? children : <div>Empty group!</div>}
            </div>
        </div>
    );
}

function DemoLayout() {
    return (
        <Outlet />
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
            <DemoGroup name="Loading" width={1 / 3}>
                <Loading type="inline" />
                <Loading type="inline" color="red" />
                <Loading type="inline" color="blue" />
                <Loading type="inline" message="hello world" />
            </DemoGroup>
        )
    }, {
        path: 'data',
        element: <Outlet />,
        children: [{
            path: 'table',
            element: (
                <DemoGroup>
                    <DataTable  data={[{ name: 'ID', unique: 'unique' }]} />
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