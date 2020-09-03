import React, { Fragment, useEffect, useState } from 'react';

import { Link } from "react-router-dom";

import moment from 'moment';

// import { blogFetched } from '../../../utils/murph_store';

import './blog_achive.css';

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
        setAchiveItems({});
    }, []);
    document.title = `归档 - ${process.env.REACT_APP_TITLE || ''}`;
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