# /login/login_route.coffee

FlowRouter.route "/login",
	name:"login"
	triggersEnter:[RT.non_user_only]
	action: ->
		BlazeLayout.render "layout",
			content:"login"
