# /_globals/router/triggers.coffee

@RT =
	non_user_only: (context,redirect) ->
		if Meteor.userId()
			if context and context.oldRoute
				redirect context.oldRoute.path
			else
				redirect "/"

	admin_only: (context,redirect) ->
		if not Roles.userIsInRole Meteor.userId(),["admin"]
			if context and context.oldRoute
				redirect context.oldRoute.path
			else
				redirect "/"

FlowRouter.triggers.enter [RT.admin_only], except:["products","login","cart","order_quantity"]

