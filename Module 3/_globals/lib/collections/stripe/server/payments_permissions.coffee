# /_globals/lib/collections/stripe/server/payments_permissions.coffee

Meteor.startup ->
	# Nobody may modify
	Payments.permit ["insert","remove","update"]
		.never()
		.apply()


