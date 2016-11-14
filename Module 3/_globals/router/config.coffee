# /_globals/router/config.coffee


if Meteor.isClient
	BlazeLayout.setRoot 'body'

	FlowRouter.wait()
	Meteor.startup ->
		# Initialize roles before FlowRouter
		Tracker.autorun (computation) ->
			if Roles.subscription.ready() and not FlowRouter._initialized
				FlowRouter.initialize()
				computation.stop()

	Meta.config
		options:
			title:"Crashing Meteor"
			suffix:""

	Template.created ->
		except = [
			"Template.__dynamicWithDataContext"
			"Template.__dynamic"
			"Template.layout"
			"body"
		]

		unless _.contains except, @view.name
			window.prerenderReady = false

			if @subscriptionsReady()
				window.prerenderReady = true


FlowRouter.notFound =
	action: ->
		BlazeLayout.render "layout",
			content:"not_found"


