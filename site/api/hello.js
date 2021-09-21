const { readdirSync } = require('fs');

export default (req, res) => {
  res.json({ 
    name: 'murph', 
    email: 'murphyl@outlook.com',
    func: __filename,
    list: readdirSync(req.query.who || '/', 'utf8'),
  })
}