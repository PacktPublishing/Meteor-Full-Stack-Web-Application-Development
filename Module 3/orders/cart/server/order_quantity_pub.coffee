# /orders/cart/server/order_quantity_pub.coffee

Meteor.publish "order_quantity", (ops={}) ->
	if ops.product and not _.isEmpty ops.product
		@relations
			collection:Products
			filter:
				_id:ops.product

		@relations
			collection:Orders
			filter:
				_id:ops.order
				status:"new"
			mappings:[
				{
					key:"order"
					collection:OrderDetails
					filter:
						product:ops.product
				}
			]

	@ready()



