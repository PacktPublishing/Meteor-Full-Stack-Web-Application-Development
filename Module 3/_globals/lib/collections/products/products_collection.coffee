# /_globals/lib/collections/products/products_collection.coffee

@Products = new Mongo.Collection "products"

Products.attachSchema new SimpleSchema
	name:
		type:String
		label:"Name"

	description:
		type:String
		label:"Description"
		optional:true

	sku:
		type:String
		label:"SKU"
		optional:true

	price:
		type:Number
		label:"Price"




