Meteor.startup ->
	# Admin may only modify status
	Orders.permit "update"
		.ifLoggedIn()
		.ifHasRole "admin"
		.onlyProps "status"
		.apply()

	Orders.permit ["insert","remove"]
		.never()
		.apply()


