const { readdirSync } = require('fs');

export default (req, res) => {
  res.json({ 
    name: 'murph', 
    email: 'murphyl@outlook.com',
    files: readdirSync(req.query.who, 'utf8'),
  })
}