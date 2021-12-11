import React, { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import DriftNavi from 'plug/extra/drift-navi/drift-navi.module';

export default function DriftLayout() {
    return (
        <Fragment>
            <Outlet />
            <DriftNavi postion={['right', 'bottom']}>
                <Link to="/">首页</Link>
            </DriftNavi>
        </Fragment>
    );
};