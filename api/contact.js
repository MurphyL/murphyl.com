const axios = require('axios');

const slackWebhook = `https://hooks.slack.com/services/${process.env.SLACK_WEBHOOK}`

export default async (req, res) => {

	const { message = 'hello, murph' } = req.query;
	
	const html = await axios.post(slackWebhook, {
		params: { 'payload': JSON.stringify({ text: message }) }
	});

	console.log('Webhook url:', slackWebhook);
	console.log('Response:', html);

	res.json({
		code: 0,
		payload: {
			message, html
		}
	});

};