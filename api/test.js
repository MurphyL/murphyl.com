const blog = require('./blog.x');

export default (req, res) => {
	const unique = req.query.db;

	res.json({
		code: 0,
		payload: {
			blog,
			unique,
			env: process.env
		}
	})

}