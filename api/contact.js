const axios = require('axios');

export default async (req, res) => {

	const unique = req.query.db;
	
	const html = await axios.get('http://cijian.us');

	console.log(html);

	res.json({
		code: 0,
		payload: {
			unique,
			env: process.env
		}
	});

};