Template.colors.helpers({
  swatches: function(){
    return Swatches.find().fetch();
  }
})
Template.body.events({
  'click #newColor' : function(e){
    Meteor.call('addUniqueSwatch' , randomColor());
  }
})