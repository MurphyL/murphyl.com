const axios = require('axios');

export default (req, res) => {

	const unique = req.query.db;
	
	axios.get('http://cijian.us').then(html => {
		console.log(html)
	}).catch(error => {
		console.log(error);
	});


	res.json({
		code: 0,
		payload: {
			unique,
			env: process.env
		}
	});

};