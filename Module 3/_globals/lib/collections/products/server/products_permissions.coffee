Meteor.startup ->
	Products.permit ["update","insert","remove"]
		.ifLoggedIn()
		.ifHasRole "admin"
		.apply()





