Meteor.publish "dashboard", ->
	totals = Orders.aggregate [
			{
				$match:
					status:"pending"
			}
			{
				$group:
					_id:null
					total:
						$sum:"$total"
					subtotal:
						$sum:"$subtotal"
					discount:
						$sum:"$discount.amount"
			}
		]

	if totals and totals.length > 0 and totals[0]
		@added "aggregate","dashboard.totals",totals[0]

Meteor.publish "latest_sales", ->
	@unblock()

	HTTP.get "https://api.stripe.com/v1/charges?limit=3",
		headers:
			"Authorization":"Bearer SECRETKEY"
		(error,result) =>
			if not error
				_.each result.data.data, (payment) =>
					@added "aggregate", "dashboard.sales.#{Meteor.uuid()}",payment
			else
				console.log error

