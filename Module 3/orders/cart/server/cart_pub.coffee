Meteor.publish "cart", (ops={}) ->
	if ops.order and not _.isEmpty ops.order
		@relations
			collection:Orders
			filter:
				_id:ops.order
				status:"new"
			mappings:[
				{
					key:"order"
					collection:OrderDetails
					options:
						limit:25
					mappings:[
						{
							foreign_key:"product"
							collection:Products
						}
					]
				}
			]

	@ready()



