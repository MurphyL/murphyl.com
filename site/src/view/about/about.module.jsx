import React from 'react';
import { Helmet } from 'react-helmet-async';
import SiteLayout from "plug/layout/site-layout/site-layout.module.jsx";

export default function About() {
    return (
        <SiteLayout>
            <Helmet>
                <title>关于 - {process.env.REACT_APP_TITLE}</title>
            </Helmet>
            <div style={{ padding: '20vh 0 30vh', textAlign: 'center' }}>about</div>
        </SiteLayout>
    );
};