import React from 'react';

import { useParams } from "react-router-dom";

import './blog_author.css';

const BlogAuthor = () => {
	const { unique } = useParams();
	return (
		<div className="author">
			<div>Author: { unique }</div>
		</div>
	);
};

export default BlogAuthor;