@ProductImages = new Mongo.Collection "product_images"

ProductImages.attachSchema new SimpleSchema
	product:
		type:String

	master:
		type:String

	side:
		type:String
		optional:true

	front:
		type:String
		optional:true

	top:
		type:String
		optional:true

	cart:
		type:String
		optional:true


