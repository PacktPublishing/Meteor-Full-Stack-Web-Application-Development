# /_globals/server/security.coffee

Meteor.startup ->
	# Prevent webapp from loading on an iframe
	BrowserPolicy.framing.disallow()

	# Prevent inline scripting
	BrowserPolicy.content.disallowInlineScripts()

	trusted_sites = [
		"*.google-analytics.com"
		"*.mxpnl.com"
		"placehold.it"
		"placeholdit.imgix.net"
	]

	_.each trusted_sites, (trusted_site) ->
		BrowserPolicy.content.allowOriginForAll "https://#{trusted_site}"


Security.defineMethod "ifUserIsOwner",
	deny: (type,args,user,doc) ->
		user isnt (doc.user or doc._id)

Security.permit(["update"]).collections([Meteor.users])
	.ifUserIsOwner()
	.onlyProps ["emails"]
	.apply()

Security.permit(["insert","update","remove"]).collections([Meteor.users])
	.ifHasRole "admin"
	.apply()

