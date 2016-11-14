Meteor.startup ->
	ProductsTags.permit ["update","insert","remove"]
		.ifLoggedIn()
		.ifHasRole "admin"
		.apply()





