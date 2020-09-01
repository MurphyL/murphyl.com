import React, { useEffect } from 'react';

import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import { fetchCodeItems } from '../../../utils/murph_store';

import './snippets.css';

const Snippets = () => {
	const minSize = (document.body.clientWidth - 200 - 150) * 0.6;
	useEffect(() => {
		fetchCodeItems({ size: 30 }).then(resp => {
			console.log(resp);
		});
	}, []);
    return (
		<div id="snippets">
			<div className="nav">
				<dl>
					<dd>
						<ul>
							<li>Inbox</li>
							<li>Tags</li>
						</ul>
					</dd>
					<dt>Labels</dt>
					<dd>
						<ul>
							<li>Java</li>
							<li>Spring</li>
							<li>React</li>
						</ul>
					</dd>
				</dl>
			</div>
			<div className="main">
				<SplitterLayout primaryIndex={1} primaryMinSize={ minSize } secondaryInitialSize={ 200 } secondaryMinSize={ 180 }>
					<div>Pane 1</div>
					<div>Pane 2</div>
				</SplitterLayout>
			</div>
		</div>
    );
}

export default Snippets;