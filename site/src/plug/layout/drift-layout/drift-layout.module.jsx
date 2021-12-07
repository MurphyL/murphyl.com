import React, { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import { useDocumentTitle } from 'plug/hooks';

import DriftNavi from 'plug/extra/drift-navi/drift-navi.module';

export default function DriftLayout({ children, title }) {
    useDocumentTitle(title);
    return (
        <Fragment>
            {children ? children : <Outlet />}
            <DriftNavi postion={['right', 'bottom']}>
                <Link to="/">首页</Link>
            </DriftNavi>
        </Fragment>
    );
};