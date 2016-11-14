# /login/client/login.coffee

Template.created "login", ->
	@error = new ReactiveVar false

Template.login.events
	"submit .login": (event,i) ->
		event.preventDefault()
		email = $(".email").val()
		pw = $(".password").val()

		# Check Email
		if email and not _.isEmpty email.trim()
			email = email.replace /\s/g,""
			email = email.trim().toLowerCase()
		else
			i.error.set "Email is invalid"
			return

		# Check Password
		if not pw or _.isEmpty pw
			i.error.set "Password is invalid"
			return

		i.error.set false

		Meteor.loginWithPassword email, pw, (error) ->
			if not error
				i.error.set false
				$("input").val ""
				FlowRouter.go "dashboard"
			else
				i.error.set error.reason

Template.login.helpers
	"error": ->
		Template.instance().error.get()



