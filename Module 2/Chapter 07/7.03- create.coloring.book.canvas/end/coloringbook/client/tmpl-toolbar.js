Template.toolbar.rendered = function(){
  // we first need to turn on hammer.js touch events...
  var brushSize = this.$('#brush-size').hammer();
  // ...we then change the pan threshold from 10 to 2
  var mgr = brushSize.data('hammer');
  mgr.get('pan').set({ threshold: 2 });
};

Template.toolbar.helpers({
  swatches: function () {
    // Return the swatches for this user
    return Swatches.find({ user: Meteor.userId() });
  },
  preview : function(){
    // gets preferences for toolbar, with one modification...
    var prefs = Prefs.findOne({user:Meteor.userId()});
    // ...because brush is a circle, we need radius, not diameter
    if (prefs) prefs.size= ~~(prefs.size/2);
    return prefs;
  },
  eraseMode : function(){
    // if we're in erase mode, the brush circle is hidden
    return (Session.get('erase')? 'none':null);
  }
});

Template.toolbar.events({
  'panstart #brush-size' : function(ev){
    // record our offset position, and turn on resizing
    Session.set('brushFrom',ev.gesture.center.x);
    Session.set('brushResize',true);
  },
  'pan #brush-size': function(ev){
    // if we're not resizing, no need to continue
    if (!Session.equals('brushResize',true)) return;
    // likewise, if there are no prefs, just return
    var prefs = Prefs.findOne({user:Meteor.userId()});
    if (!prefs) return;
    // calculate the delta from last we checked...
    var adjustment = Session.get('brushFrom');
    adjustment = ev.gesture.center.x - adjustment;
    // ...and create a new brush size
    var newbrushSize = prefs.size + adjustment;
    // reset offset position, in case resizing continues
    Session.set('brushFrom', ev.gesture.center.x);
    // new brush size needs to be the 3rd bowl of porridge...
    if (newbrushSize<=70&&newbrushSize>=3){
      // adjust the preferences record and update the collection
      prefs.size = newbrushSize;
      Prefs.update({_id:prefs._id}, prefs);
    }
  },
  'panstop #brush-size': function(ev){
    // job's done. clean up.
    Session.set('brushFrom');
    Session.set('brushResize',false);
  },
  'doubletap #brush-size': function(ev){
  // turn on 'erase' mode
  Session.set('erase',(!Session.get('erase')));
}
                        });