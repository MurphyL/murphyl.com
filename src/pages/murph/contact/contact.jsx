import React from 'react';


const Contact = () => {
	document.title = `联系我 - ${process.env.REACT_APP_TITLE || ''}`;
	return (
		<div>联系我</div>
	);
};

export default Contact;