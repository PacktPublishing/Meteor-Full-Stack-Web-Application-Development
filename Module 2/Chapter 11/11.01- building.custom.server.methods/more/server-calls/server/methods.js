Meteor.methods({
  clearSwatches: function(){
    Swatches.remove({});
  },
  addUniqueSwatch: function(newColor){
    if (Swatches.findOne({color:newColor})) return null;
    Swatches.insert({color:newColor});
    return Swatches.find().count();
  }
});