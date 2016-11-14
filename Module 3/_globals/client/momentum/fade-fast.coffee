# /_globals/client/momentum/fade-fast.coffee

Momentum.registerPlugin 'fade-fast', (options) ->
	insertElement: (node, next) ->
		$(node)
			.addClass "animate opacity invisible"
			.insertBefore(next)

		Meteor.setTimeout ->
				$(node).removeClass "invisible"
			,250

	removeElement: (node) ->
		$(node).velocity opacity:0, 250, "easeOut", ->
			$(this).remove()

