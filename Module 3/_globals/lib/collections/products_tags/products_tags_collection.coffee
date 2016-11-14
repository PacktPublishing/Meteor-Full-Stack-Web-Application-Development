@ProductsTags = new Mongo.Collection "products_tags"

ProductsTags.attachSchema new SimpleSchema
	product:
		type:String

	tag:
		type:String



