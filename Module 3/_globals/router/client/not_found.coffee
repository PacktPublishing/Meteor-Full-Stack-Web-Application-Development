# /_globals/router/client/not_found.coffee

Template.rendered "not_found", ->
	Meta.set [
		{
			name:"name"
			property:"prerender-status-code"
			content:"404"
		}
		{
			name:"name"
			property:"robots"
			content:"noindex, nofollow"
		}
	]
