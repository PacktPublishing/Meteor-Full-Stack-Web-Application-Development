Swatches = new Mongo.Collection('swatches');
randomColor = function(){
  var retCol = '#';
  while (retCol.length<4) {
    retCol += Random.choice('06F');
  }
  return retCol;
}