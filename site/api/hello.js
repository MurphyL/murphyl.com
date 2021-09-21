const fs = require('fs');

const meta = {
    name: 'murph',
    email: 'murphyl@outlook.com',
    func: __filename,
};

export default (req, res) => {
    const { where = '/' } = req.query;
    fs.stat(where, (err, stats) => {
        if (err) {
            res.json({
                ...meta,
                message: '指定的路径不存在！'
            });
        } else if (stats.isFile()) {
            res.json({
                ...meta,
                list: fs.readFileSync(req.query.where || '/', 'utf8')
            });
        } else if (stats.isDirectory()) {
            res.json({
                ...meta,
                list: fs.readdirSync(req.query.where || '/', 'utf8')
            });
        } else {
            res.json({
                ...meta,
                message: '指定的路径不存在！'
            });
        }
    });
};