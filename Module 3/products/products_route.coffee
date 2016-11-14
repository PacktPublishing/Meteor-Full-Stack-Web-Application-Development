# /products/products_route.coffee

FlowRouter.route "/",
	name:"products"
	action: ->
		BlazeLayout.render "layout",
			content:"products"

FlowRouter.route "/products/create",
	name:"create_product"
	action: ->
		BlazeLayout.render "layout",
			content:"create_product"


