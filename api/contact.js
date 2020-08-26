const axios = require('axios');

const slackChannel = process.env.SLACK_WEBHOOK;

const slackWebhook = `https://hooks.slack.com/services/${slackChannel}`;

export default async (req, res) => {

	const { message = 'hello, murph' } = req.query;
	
	axios.post(slackWebhook, { 
		text: message,
		icon_emoji: ':cat:',
		channel: '#creative',
		username: 'murphyl.com',
		attachments: [{
			title: 'Message from:',
			text: '技术博客'
		}]
	}).then(({ data }) => {
		console.log('发送消息成功', data);
		console.log(JSON.stringify(req));
		res.json({
			code: 0,
			payload: {
				message,
				feedback: data
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