import React, { Fragment } from 'react';

import NextHead from 'next/head';

import Header from '../includes/components/header.jsx';
import Footer from '../includes/components/footer.jsx';

import '../includes/style/app.css';

/**
<a className="ribbons" href={ `https://github.com/${ process.env.social.github }`}>
	<img width="149" height="149" src="/image/forkme_right_darkblue.png" className="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1" />
</a>
**/

export default function Coffee({ Component, pageProps }) {
	return (
		<Fragment>
		    <NextHead>
	        	<title>{ `${ pageProps.title ? (pageProps.title + ' - ') : '' }${process.env.appTitle}` }</title>
	        </NextHead>
	        <div className={ `${ pageProps.full ? 'full' : 'normal' }-width` }>
	        	<Header />
				<main>
					<div className="container">
						<Component {...pageProps} />
					</div>
				</main>
				<Footer />
			</div>
		</Fragment>
	)
}