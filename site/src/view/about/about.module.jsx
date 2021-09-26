import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import SiteLayout from "plug/template/site-layout/site-layout.module.jsx";

export default function About() {
    return (
        <Fragment>
            <Helmet>
                <title>关于 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <SiteLayout>
                <div style={{ padding: '20vh 0 30vh', textAlign: 'center' }}>about</div>
            </SiteLayout>
        </Fragment>
    );
};