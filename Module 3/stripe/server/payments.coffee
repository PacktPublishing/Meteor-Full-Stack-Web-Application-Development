# /stripe/server/payments.coffee

_.extend Stripe,
	payments:
		get: (ops={}) ->
			if not Stripe.payments.is_running
				Stripe.payments.is_running = true

				params =
					limit:100

				if ops.starting_after_id
					_.extend params,
						starting_after:ops.starting_after_id
				else
					date_after = moment().utc().startOf("day").subtract(10,"days").unix()
					latest_payment = Payments.findOne created:$gte:date_after,
						sort:
							created:1

					if latest_payment
						_.extend params
							starting_after:latest_payment.id

				HTTP.get "https://api.stripe.com/v1/charges",
					headers:
						"Authorization":"Bearer #{Stripe.secret}"
					params:params
					(error,result) ->
						if not error
							_.each result.data?.data, (charge) ->
								Payments.upsert _id:charge.id,
									$set:charge

							if result.data.has_more
								last = _.last result.data.data
								Stripe.payments.get
									starting_after_id:last.id
							else
								Stripe.payments.is_running = false

						else
							Stripe.payments.is_running = false
							throw new Meteor.Error error

		set_interval: ->
			Meteor.setInterval Stripe.payments.get,3600000

		is_running:false

if process.env.NODE_ENV isnt "development"
	Stripe.payments.set_interval()
