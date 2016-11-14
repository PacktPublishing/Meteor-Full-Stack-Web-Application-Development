Template.created "dashboard", ->
	@autorun =>
		@subscribe "dashboard"
		@subscribe "latest_sales"


