const axios = require('axios');
const kindOf = require('kind-of');

export default (req, res) => {
    if (req.query.type === 'ajax') {
        res.header('X-FROM-MURPH', "yes")
        res.redirect('http://cijian.us');
    } else {
        res.json({
            type: kindOf(req.query)
        });
    }
};