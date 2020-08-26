const axios = require('axios');

const slackWebhook = `https://hooks.slack.com/services/${process.env.SLACK_WEBHOOK}`

export default (req, res) => {

	const { message = 'hello, murph' } = req.query;
	
	axios.post(slackWebhook, {
		data: { text: message } 
	}).then(resp => {
		console.log('Response:', resp);
		console.log('发送消息成功');
		res.json({
			code: 0,
			payload: {
				message,
				slackWebhook
			}
		});
	}).catch(error => {
		console.log('发送消息出错~');
		console.log('Error:', error);
		res.json({
			code: 1,
			payload: {
				message,
				slackWebhook
			}
		});
	});

};