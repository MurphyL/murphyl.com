module.exports = {
	env: {
		appTitle: '咖啡·薄荷',
		header: [{
			label: 'Blog',
			url: '/blog'
		}, {
			label: '笔记',
			url: '/docs'
		}, {
			label: '关于',
			url: '/about'
		}],
		docs: {
			"Java": [
				"core-java"
			],
			"Linux": [
				"linux-shell-script",
				"linux-system-info"
			],
			"Tuning": [
			],
			"Other": [
				"awesome-app-windows",
				"data_visualization"
			]
		},
		social: {
			github: 'MurphyL'
		}
	},
	publicRuntimeConfig: {
		staticFolder: '/public',
	},
}