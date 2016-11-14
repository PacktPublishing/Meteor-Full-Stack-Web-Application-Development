Meteor.startup ->
	ProductImages.permit ["update","insert","remove"]
		.ifLoggedIn()
		.ifHasRole "admin"
		.apply()





