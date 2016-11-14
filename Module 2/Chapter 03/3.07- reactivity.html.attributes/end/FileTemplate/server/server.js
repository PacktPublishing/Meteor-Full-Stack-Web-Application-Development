Meteor.methods({
  resetShapes: function(){
    Shapes.remove({});
  }
});
