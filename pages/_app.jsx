import React, { Fragment } from 'react';

import NextHead from 'next/head';

import Header from '../includes/components/header.jsx';
import Footer from '../includes/components/footer.jsx';

import '../includes/style/app.css';

export default function Coffee({ Component, pageProps }) {
	return (
		<Fragment>
		    <NextHead>
	        	<title>{ process.env.appTitle }</title>
	        </NextHead>
	        <Fragment>
	        	<Header />
				<main>
					<Component {...pageProps} />
				</main>
				<Footer />
			</Fragment>
		</Fragment>
	)
}