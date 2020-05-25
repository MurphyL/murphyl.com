import React, { useEffect, useState } from 'react';

import { Loading } from 'core/loading/loading';

import { ajaxGet } from 'utils/rest_client';

export default function Documents() {
	const [ state, setState ] = useState({ code: -1 });
	useEffect(() => {
		ajaxGet('docs.json').then(setState);
	}, []);
    if(state.code === -1) {
        return (
            <Loading message="正在加载文档流……" />
        );
    } else if(state.code === 1) {
        return (
            <div>加载文章列表出错~</div>
        )
    }
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