Swatch = function (color){
  this.color = color;
}
Swatch.prototype = {
  constructor: Swatch,
  switch: function(){
    this.color = randomColor();
  },
  toString: function(){
    return "My color is: " + this.color;
  }
}