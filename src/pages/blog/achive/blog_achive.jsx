import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import './blog_achive.css';

const BlogAchive = ({ blogAction, dispatch }) => {
    useEffect(() => {
        dispatch({ type: 'FETCH_POSTS' });
    }, [ dispatch ]);
    useEffect(() => {
        blogAction.then(items => {
            console.log(items);
        });
    }, [ blogAction ]);
	return (
		<div className="achive">
			<p>Achive</p>
		</div>
	);
};

const mapStateToProps = ({ blogAction }, ownProps) => {
    return {
        blogAction
    };
};

export default connect(mapStateToProps)(BlogAchive);