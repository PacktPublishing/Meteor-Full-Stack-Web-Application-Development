# /orders/cart/cart_route.coffee

FlowRouter.route "/cart",
	name:"cart"
	action: ->
		BlazeLayout.render "layout",
			content:"cart"

FlowRouter.route "/cart/:product/quantity",
	name:"order_quantity"
	action: ->
		BlazeLayout.render "layout",
			content:"order_quantity"

