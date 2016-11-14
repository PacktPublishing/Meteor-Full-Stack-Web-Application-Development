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
  },
  typeName: function(){
    return 'Swatch';
  },
  toJSONValue: function(){
    return {
      color:this.color
    };
  }
}

EJSON.addType("Swatch", function fromJSONValue(value){
  return new Swatch(value.color);
});

