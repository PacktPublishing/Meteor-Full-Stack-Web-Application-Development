// suuuuper simple turning on of touch events
// using hammer.js
Template.swatch.rendered = function () {
  this.$('.swatch').hammer();
};
Template.swatch.events({
  'tap .swatch': function (ev) {
    // if no preference, return;
    var prefs = Prefs.findOne({user:Meteor.userId()});
    if (!prefs) return;
    // change the color to whatever swatch we tapped on
    prefs.color = this.color;
    // update Prefs collection
    Prefs.update({_id:prefs._id},prefs);
  }
});