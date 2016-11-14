# /_globals/server/stripe.coffee

@Stripe =
	secret:"secret"
	publishable:"public"
	hooks:
		v1:new Restivus
			apiPath:"stripe"
			version:"v1"


