# /_globals/server/initial_setup.coffee

Meteor.startup ->
	# Products
	if Products.find().count() is 0
		Products.insert
			name:"Nuka Cola"
			price: 1099

		Products.insert
			name:"1up Soda"
			price: 999

		Products.insert
			name:"JuggerNog"
			price: 899

	# Users
	if Meteor.users.find().count() is 0
		user = Accounts.createUser
			email:"you@email.com"
			password:"1234"

		Roles.addUsersToRoles user, ["admin"]


