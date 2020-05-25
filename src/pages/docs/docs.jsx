import React, { useEffect, useState } from 'react';

import { ajaxGet } from 'utils/rest_client';

export default function Documents() {
	const [ state, setState ] = useState({ code: -1 });
	useEffect(() => {
		ajaxGet('docs.json').then(setState);
	}, []);
	return (
		<ul>
			{(state.payload || []).map((item, index) => (
				<li key={index}>
					<a href={ `/post/${item.filename}` }>{ item.title }</a>
				</li>
			))}
		</ul>
	);
}