const axios = require('axios');

const slackWebhook = `https://hooks.slack.com/services/${process.env.SLACK_WEBHOOK}`

export default async (req, res) => {

	const { message = 'hello, murph' } = req.query;
	
	axios.post(slackWebhook, { text: message }).then(({ data }) => {
		console.log('发送消息成功', data);
		res.json({
			code: 0,
			payload: {
				message,
			}
		});
	}).catch(error => {
		console.error('发送消息出错：', error);
		res.json({
			code: 1,
			payload: {
				message,
			}
		});
	});

};