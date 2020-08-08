export default (req, res) => {
	const unique = req.query.db;

	res.json({
		code: 0,
		payload: {
			unique,
			env: process.env
		}
	})

}