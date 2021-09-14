import React, { Fragment } from 'react';

import NavLayout from 'plug/layout/nav_layout/nav_layout.module.jsx';

import docs from 'data/docs/awesome-docs.json';

export default function Documents() {
	return (
		<NavLayout>
			<dl>
				{(docs || []).map((group, gi) => (
					<Fragment key={gi}>
						<dt id={group.unique}>{group.label}</dt>
						<dd>
							{(group.children || []).map((item, di) => (
								<div ket={di}>
									<h3>{item.label}</h3>
									<p>{item.desc || ''}</p>
								</div>
							))}
						</dd>
					</Fragment>
				))}
			</dl>
		</NavLayout>
	);
}