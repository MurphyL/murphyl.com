export default (req, res) => {

	const { url } = req.query || {};
	
	res.json({
		code: 0,
		payload: {
			url,
		}
	});

};