# /stripe/server/endpoints/charges.coffee

Meteor.startup ->
	Stripe.hooks.v1.addRoute "charge",
		post: ->
			payment = @request.body.data?.object
			if payment
				Payments.upsert _id:payment.id,
					$set:payment

			@done()

