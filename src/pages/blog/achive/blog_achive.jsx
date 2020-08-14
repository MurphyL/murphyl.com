import React, { Fragment, useEffect, useState } from 'react';

import { Link } from "react-router-dom";

import { connect } from 'react-redux';

import moment from 'moment';

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

const BlogAchive = ({ blogAction, dispatch }) => {
	const [ achiveItems, setAchiveItems ] = useState({});
    useEffect(() => {
        dispatch({ type: 'FETCH_POSTS' });
    }, [ dispatch ]);
    useEffect(() => {
        blogAction.then((items = []) => {
        	const achiveTemp = {};
            items.forEach((item) => {
            	const date = moment(item.filename.substring(0, 8));
            	const month = moment(date).format('YYYY/MM');
            	item['dt'] = date.format('YYYY/MM/DD');
            	if(!achiveTemp[month]) {
            		achiveTemp[month] = [];
            	}
            	achiveTemp[month].push(item);
            });
            setAchiveItems(achiveTemp);
        });
    }, [ blogAction ]);
	return (
		<div className="achive">
			<dl>
				{ Object.keys((achiveItems || {})).map((key, index) => (
					<AchiveList key={ index } title={ key } items={ achiveItems[key] } />
				)) }
			</dl>
		</div>
	);
};

const mapStateToProps = ({ blogAction }, ownProps) => {
    return {
        blogAction
    };
};

export default connect(mapStateToProps)(BlogAchive);