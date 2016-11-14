Meteor.startup ->
	Tags.permit ["update","insert","remove"]
		.ifLoggedIn()
		.ifHasRole "admin"
		.apply()





