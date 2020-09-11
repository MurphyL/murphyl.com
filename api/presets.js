const request = require('request');

const PREFIX = 'https://raw.githubusercontent.com/MurphyL/dow-presets/master';


export default (req, res) => {

	const { url } = req.query || {};
	
	request({
		method: 'GET',
		uri: `${PREFIX}/${url || ''}`,
		json: false
	}, (_err, _res, _resBody) => {
		res.send(_resBody);
	})

};