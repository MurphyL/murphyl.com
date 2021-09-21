const { readFileSync } = require('fs');
const { join } = require('path');

export default (req, res) => {
  res.json({ 
    name: 'murph', 
    email: 'murphyl@outlook.com',
    files: readFileSync(join(__dirname, 'config', 'ci.yml'), 'utf8')
  })
}