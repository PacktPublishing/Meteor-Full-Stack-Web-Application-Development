Template.colors.helpers({
  swatches: function(){
    return Swatches.find().fetch();
  },
  color : function(){
    return this.swatch.color;
  }
})

Template.colors.events({
  'click .swatch' : function(e){
    this.swatch.color = randomColor();
    Swatches.update(this._id,this);
  }
})

Template.body.events({
  'click #newColor' : function(e){
    Meteor.call('addUniqueSwatch' , randomColor());
  }
})