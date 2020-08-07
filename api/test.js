const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const db = low(new FileSync('blog.x.json'));

export default (req, res) => {
	const posts = db.defaults({ blog: [] }).get('blog').value()
	res.json({ name: 'murph', email: 'murphyl@outlook.com', posts })
}