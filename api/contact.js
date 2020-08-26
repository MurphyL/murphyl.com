const axios = require('axios');

const slackWebhook = `https://hooks.slack.com/services/${process.env.SLACK_WEBHOOK}`

export default async (req, res) => {
	const { message = 'hello, murph' } = req.query;
	const invokeResp = { desc: 'Slack发送消息到群组' };
	try{
		const slack = await axios.post(slackWebhook, { text: message });
		Object.assign(invokeResp, { code: 0, playload: { slack } });
	} catch(error) {
		Object.assign(invokeResp, { code: 1, error: '发送消息错误' });
	}
	res.json(invokeResp);
};