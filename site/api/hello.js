const { readFileSync } = require('fs');

export default (req, res) => {
  res.json({ 
    name: 'murph', 
    email: 'murphyl@outlook.com',
    files: readFileSync(join__dirname, 'utf8')
  })
}