const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'https://murph.now.sh',
			logLevel: 'debug',
			xfwd: true,
			autoRewrite: false,
			changeOrigin: true,
			protocolRewrite: 'http'
		})
	);
};