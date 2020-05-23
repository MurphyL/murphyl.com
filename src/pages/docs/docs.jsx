import React from 'react';

export default function Documents({ docs = [], dict = {} }) {
	const items = docs.map(item => (dict[item]))
	return (
		<ul>
			{ items.map((item, index) => (
				<li key={index}>
					<a href={ '/post/' + item.filename }>{ item.title }</a>
				</li>
			)) }
		</ul>
	);
}