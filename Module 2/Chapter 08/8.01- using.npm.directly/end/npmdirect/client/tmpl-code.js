Template.code.helpers({
  highlighted : function(){
    return Session.get('code');
  }
});
Meteor.startup(function(){
  Meteor.call('highlight', function(e,d){
    if (e) return;
    Session.set('code',d);
  });
});