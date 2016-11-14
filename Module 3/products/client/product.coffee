# /products/client/product.coffee

Template.created "product", ->
	@autorun =>
		filter = {}

		# Get the product ID from the context
		product = @data._id
		_.extend filter,
			product:product

		# Get the order if any
		order = Session.get "global.order"
		if order and not _.isEmpty order
			_.extend filter,
				order:order

		@subscribe "product", filter


Template.product.events
	"click button.add-to-cart": (event) ->
		Meteor.call "cart.add-to-cart",
			order:Session.get "global.order"
			product:@_id
			quantity:1
			(error,r) ->
				if not error
					FlowRouter.go "products"

	"click button.modify-quantity": ->
		FlowRouter.go "order_quantity",
			product:@_id








