const low = require('lowdb');
const axios = require('axios');
const Memory = require('lowdb/adapters/Memory');


const local = {};

const send = (resp) => {
	resp.json({
		code: -1,
		message: "truning"
	})
}

export default (req, res) => {
	const unique = req.query.db;

	if(!unique) {
		res.status(400).json({
			code: 1,
			message: '未指定数据库'
		});
	} else if(local[unique]) {
		send(res);
	} else {
		axios.get(unique).then((data) => {
			local[unique] = low(new FileSync({}));
		}).then((data) => {
			send(res);
		}).catch(e => {
			res.json({
				code: 1,
				message: '查询数据出错',
				error: e
			})
		})
	}

}