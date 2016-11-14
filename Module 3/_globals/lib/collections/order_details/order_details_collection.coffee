@OrderDetails = new Mongo.Collection "order_details"

OrderDetails.attachSchema new SimpleSchema
	order:
		type:String

	product:
		type:String

	price:
		type:Number

	quantity:
		type:Number

	subtotal:
		type:Number

	tax:
		type:Object
		optional:true

	"tax.rate":
		type:Number

	"tax.amount":
		type:Number

	total:
		type:Number

