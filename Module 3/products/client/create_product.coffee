# /products/client/create_product.coffee

AutoForm.addHooks "insert_product",
	formToDoc: (product) ->
		product.price = product.price * 100

		product

	docToForm: (product) ->
		product.price = product.price / 100

		product