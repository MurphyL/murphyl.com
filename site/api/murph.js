const axios = require('axios');
const kindOf = require('kind-of');

export default (req, res) => {
    if (req.query.type === 'ajax') {
        axios.get('http://cijian.us').then((status, data) => {
            res.json({
                ajax: 'ok',
                status,
                data
            });
        });
    } else {
        res.json({
            type: kindOf(req.query)
        });
    }
};