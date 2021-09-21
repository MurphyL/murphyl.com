const { readFileSync } = require('fs');

export default (req, res) => {
  res.json({ 
    name: 'murph', 
    email: 'murphyl@outlook.com',
    func: __filename,
    files: readFileSync(__dirname, 'utf8')
  })
}