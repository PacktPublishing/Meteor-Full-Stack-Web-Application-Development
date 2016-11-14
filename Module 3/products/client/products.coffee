# /products/client/products.coffee

Template.created "products", ->
	@autorun =>
		ops =
			page: Number(FlowRouter.getQueryParam("page")) or 0
			search: FlowRouter.getQueryParam "search"

		# TAGS
		tags = Session.get "products.tags"
		if tags and not _.isEmpty tags
			_.extend ops,
				tags:tags

		# ORDER
		order = Session.get "global.order"
		if order and not _.isEmpty order
			_.extend ops,
				order:order

		@subscribe "products", ops

Template.products.helpers
	products: ->
		Products.find {},
			sort:
				name:1

	pages:
		search: ->
			FlowRouter.getQueryParam "search"

		current: ->
			FlowRouter.getQueryParam("page") or 0

		is_last_page: ->
			limit = 10
			current_page = Number(FlowRouter.getQueryParam("page")) or 0

			max_allowed = limit + current_page * limit
			max_products = Counts.get "products"

			max_allowed > max_products


Template.products.events
	"click .next-page": ->
		FlowRouter.setQueryParams
			page: (Number(FlowRouter.getQueryParam("page")) or 0) + 1

	"click .previous-page": ->
		if (Number(FlowRouter.getQueryParam("page")) or 0) - 1 < 0
			page = 0
		else
			page = (Number(FlowRouter.getQueryParam("page")) or 0) - 1

		FlowRouter.setQueryParams
			page: page

	"change .search": (event) ->
		search = $(event.currentTarget).val()

		if _.isEmpty search
			search = null

		FlowRouter.setQueryParams
			search:search
			page:null
















