import React, { Fragment, useEffect, useState } from 'react';

import { Link } from "react-router-dom";

import moment from 'moment';

import { blogFetched } from '../../../utils/murph_store';

import './blog_tag.css';

const AchiveList = ({ title = '', items = [] }) => {
	return (
		<Fragment>
			<dt>{ title }</dt>
			<dd>
				{ items.map((item, index) => (
					<Link key={ index } to={ `/post/${item.filename}` }>
						<p>{ item.title }</p>
					</Link>
				)) }
			</dd>
		</Fragment>
	);
};

const BlogAchive = () => {
	const [ achiveItems, setAchiveItems ] = useState({});
    useEffect(() => {
        blogFetched.then((fetched) => {
        	const mapping = {};
        	const items = fetched.filter({ release: true }).value();
        	for(let item of items) {
        		const key = (item.filename || '').substring(0, 6)
        		if(!mapping[key]) {
        			mapping[key] = [];
        		}
        		mapping[key].push(item);
        	}
            setAchiveItems(mapping);
        });
    }, [])
	return (
		<div className="achive">
			<dl>
				{ Object.keys((achiveItems || {})).map((key, index) => (
					<AchiveList key={ index } title={ moment(key, 'YYYYMM').format('YYYY年MM月') } items={ achiveItems[key] } />
				)) }
			</dl>
		</div>
	);
};


export default BlogAchive;