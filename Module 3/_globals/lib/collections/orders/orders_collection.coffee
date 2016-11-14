# /_globals/lib/collections/orders/orders_collection.coffee

@Orders = new Mongo.Collection "orders"

Orders.attachSchema new SimpleSchema
	status:
		type:String
		allowedValues:["new","pending","complete"]

	total_products:
		type:Number

	subtotal:
		type:Number

	tax_total:
		type:Number
		optional:true

	total:
		type:Number

	date_created:
		type:Number
		autoValue: ->
			if @isInsert
				return Date.now()
			if @isUpsert
				$setOnInsert:Date.now()






