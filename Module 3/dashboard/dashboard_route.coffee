FlowRouter.route "/dashboard",
	name:"dashboard"
	action: ->
		BlazeLayout.render "layout",
			content:"dashboard"


