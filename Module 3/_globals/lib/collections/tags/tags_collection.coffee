@Tags = new Mongo.Collection "tags"

Tags.attachSchema new SimpleSchema
	name:
		type:String
		unique:true

