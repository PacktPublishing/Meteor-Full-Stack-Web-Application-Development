# /products/server/product_pub.coffee

Meteor.publish "product", (ops={}) ->
	if ops.product and not _.isEmpty ops.product
		@relations
			collection:Products
			filter:
				_id:ops.product
			mappings:[
				{
					key:"product"
					collection:ProductImages
				}
				{
					collection:ProductsTags
					key:"product"
					mappings: [
						{
							collection:Tags
							foreign_key:"tag"
						}
					]
				}
			]

		if ops.order and not _.isEmpty ops.order
			@relations
				collection:Orders
				filter:
					_id:ops.order
					status:"new"
				mappings:[
					{
						collection:OrderDetails
						key:"order"
						filter:
							product:ops.product
					}
				]

	@ready()



