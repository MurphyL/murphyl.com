import React, { Fragment } from "react";
import { Helmet } from 'react-helmet-async';
import { Link, Outlet } from "react-router-dom";


import DriftNavi from 'plug/extra/drift-navi/drift-navi.module';

export default function DriftLayout({ title }) {
    return (
        <Fragment>
            <Helmet>
                <title>{(title ? `${title} - ` : '') + process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <Outlet />
            <DriftNavi postion={['right', 'bottom']}>
                <Link to="/">首页</Link>
            </DriftNavi>
        </Fragment>
    );
};