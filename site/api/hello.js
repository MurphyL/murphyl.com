const { readdirSync } = require('fs');

const meta = {
  name: 'murph',
  email: 'murphyl@outlook.com',
  func: __filename,
};

export default (req, res) => {
  try {
    res.json({
      ...meta,
      list: readdirSync(req.query.who || '/', 'utf8'),
    })
  } catch (e) {
    res.json({
      ...meta,
      message: `读取系统文件出错：${e.message}`
    });
  }
}