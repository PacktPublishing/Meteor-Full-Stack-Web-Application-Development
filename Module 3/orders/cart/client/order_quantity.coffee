# /orders/cart/client/order_quantity.coffee

# Attach a reactive variable to the instance
# this variable controls our total
Template.created "order_quantity", ->
	@total = new ReactiveVar()

	@autorun =>
		@subscribe "order_quantity",
			product:FlowRouter.current().params.product
			order:Session.get "global.order"

Template.order_quantity.helpers
	# Create a list of numbers for the number pad
	"numbers": ->
		_.map [1,2,3,4,5,6,7,8,9,0], (v,k) ->
			number:String v

	# Get the reactive variable
	# this will automatically update when the variable changes
	"total": ->
		Template.instance().total.get()

Template.order_quantity.events
	# Concatenate numbers to make it work like a number pad
	"click .number": (event,i) ->
		total = i.total.get()

		if total
			new_total = "#{total}#{@number}"
		else
			new_total = "#{@number}"

		i.total.set new_total

	# Remove last number from string
	"click .delete": (event,i) ->
		total = i.total.get()

		if total
			i.total.set total.slice 0,-1

	"click .add-to-cart": (event,i) ->
		# Get the total
		total = i.total.get()
		unless total
			return
		else
			total = Number total

		Meteor.call "cart.add-to-cart",
			order:Session.get "global.order"
			product:FlowRouter.current().params.product
			quantity:total
			(error,r) ->
				if not error
					FlowRouter.go "products"




