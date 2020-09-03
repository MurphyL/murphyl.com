import React from 'react';

import { useParams } from "react-router-dom";

import './blog_author.css';

const BlogAuthor = () => {
	const { unique } = useParams();
	document.title = `作者 - ${process.env.REACT_APP_TITLE || ''}`;
	return (
		<div className="author">
			<div>Author: { unique }</div>
		</div>
	);
};

export default BlogAuthor;