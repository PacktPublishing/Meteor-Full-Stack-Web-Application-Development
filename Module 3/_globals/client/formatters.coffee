# /_globals/client/formatters.coffee

@format =
  money: (value) ->
    if _.isNumber value
      "$#{(value / 100).toFixed(2)}"

Template.registerHelper "format", ->
  format
