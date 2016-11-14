if process.env.NODE_ENV is "development" or process.env.ROOT_URL.indexOf("meteor.com") > -1 #disable for dev
	Meteor.startup ->
		process.env.PACKAGE_CANONICAL_DISABLE = true
